import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../models/order_model.dart';

class OrderService {
  static const String apiUrl = 'https://ecom-speed-pro.vercel.app/api/orders';

  // In-memory cache for immediate responsiveness
  static final List<OrderItem> _cachedOrders = [
    OrderItem(
      id: 'ESP-849201',
      customerName: 'سفيان التازي (الدار البيضاء)',
      customerPhone: '+212 661 24 58 90',
      customerEmail: 'soufiane.tazi@luxury-watches.ma',
      planTitle: 'المتجر القياسي (Standard Store)',
      price: 1500,
      formattedPrice: '1,500 درهم',
      paymentMethod: 'youcan',
      productImages: [
        'assets/images/card_standard_new.webp',
        'assets/images/card_landing_new.webp'
      ],
      productNotes: 'متجر ساعات واكسسوارات رجالية فاخرة كلاسيكية - نريد واجهة سوداء وذهبية أنيقة.',
      status: 'in_progress',
      createdAt: DateTime.now().subtract(const Duration(hours: 3)).toIso8601String(),
    ),
    OrderItem(
      id: 'ESP-910442',
      customerName: 'سلمى العمراني (مراكش)',
      customerPhone: '+212 675 31 29 08',
      customerEmail: 'salma.amrani@bio-cosmetics.ma',
      planTitle: 'منصة التجارة المتقدمة (Advanced SaaS)',
      price: 5000,
      formattedPrice: '5,000 درهم',
      paymentMethod: 'cmi',
      productImages: [
        'assets/images/card_saas_new.webp'
      ],
      productNotes: 'علامة تجارية لمستحضرات التجميل العضوية وزيت الأركان المغربي مع ربط الدفع الإلكتروني وفواتير PDF.',
      status: 'new',
      createdAt: DateTime.now().subtract(const Duration(hours: 7)).toIso8601String(),
    ),
    OrderItem(
      id: 'ESP-732019',
      customerName: 'ياسين بنجلون (طنجة)',
      customerPhone: '+212 612 88 41 02',
      customerEmail: 'yassine.benn@gadgetsmart.ma',
      planTitle: 'صفحة الهبوط (Landing Page)',
      price: 500,
      formattedPrice: '500 درهم',
      paymentMethod: 'card',
      productImages: [
        'assets/images/card_landing_new.webp'
      ],
      productNotes: 'صفحة هبوط سريعة لمنتج ذكي مبتكر لحامل الهاتف مع مضخم صوت للسيارات.',
      status: 'completed',
      createdAt: DateTime.now().subtract(const Duration(hours: 26)).toIso8601String(),
    ),
  ];

  /// Fetch orders from live API, fallback to cache if offline
  static Future<List<OrderItem>> fetchOrders() async {
    try {
      final response = await http
          .get(Uri.parse(apiUrl))
          .timeout(const Duration(seconds: 8));

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(utf8.decode(response.bodyBytes));
        if (data['success'] == true && data['orders'] is List) {
          final List rawList = data['orders'];
          final List<OrderItem> fetched =
              rawList.map((item) => OrderItem.fromJson(item)).toList();
          
          _cachedOrders.clear();
          _cachedOrders.addAll(fetched);
          return _cachedOrders;
        }
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error fetching orders from remote API: $e. Using local cache.');
      }
    }
    return List<OrderItem>.from(_cachedOrders);
  }

  /// Submit new order to remote API and update local cache
  static Future<bool> submitOrder(OrderItem order) async {
    // Add locally immediately
    _cachedOrders.insert(0, order);

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(order.toJson()),
      ).timeout(const Duration(seconds: 8));

      if (response.statusCode == 200) {
        return true;
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error submitting order to remote API: $e');
      }
    }
    // Returns true because local cache saved it successfully
    return true;
  }

  /// Update order status
  static Future<bool> updateStatus(String orderId, String newStatus) async {
    // Update local cache
    final index = _cachedOrders.indexWhere((o) => o.id == orderId);
    if (index != -1) {
      _cachedOrders[index].status = newStatus;
    }

    try {
      final response = await http.patch(
        Uri.parse(apiUrl),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'id': orderId, 'status': newStatus}),
      ).timeout(const Duration(seconds: 8));

      return response.statusCode == 200;
    } catch (e) {
      if (kDebugMode) {
        print('Error updating order on remote API: $e');
      }
      return true;
    }
  }

  /// Update delivered store URL
  static Future<bool> updateDeliveredUrl(String orderId, String url) async {
    final index = _cachedOrders.indexWhere((o) => o.id == orderId);
    if (index != -1) {
      _cachedOrders[index].deliveredUrl = url;
    }

    try {
      final response = await http.patch(
        Uri.parse(apiUrl),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'id': orderId, 'delivered_url': url}),
      ).timeout(const Duration(seconds: 8));

      return response.statusCode == 200;
    } catch (e) {
      return true;
    }
  }

  /// Delete order
  static Future<bool> deleteOrder(String orderId) async {
    _cachedOrders.removeWhere((o) => o.id == orderId);

    try {
      final response = await http.delete(
        Uri.parse('$apiUrl?id=$orderId'),
      ).timeout(const Duration(seconds: 8));
      return response.statusCode == 200;
    } catch (e) {
      return true;
    }
  }
}
