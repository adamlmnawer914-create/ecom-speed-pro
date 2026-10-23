import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../models/order_model.dart';

class OrderService {
  static const String apiUrl = 'https://ecom-speed-pro.vercel.app/api/orders';

  // In-memory cache for immediate responsiveness (starts completely clean at 0)
  static final List<OrderItem> _cachedOrders = [];

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

  /// Update payment status (paid, pending, unpaid)
  static Future<bool> updatePaymentStatus(String orderId, String paymentStatus) async {
    final index = _cachedOrders.indexWhere((o) => o.id == orderId);
    if (index != -1) {
      _cachedOrders[index].paymentStatus = paymentStatus;
    }

    try {
      final response = await http.patch(
        Uri.parse(apiUrl),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'id': orderId, 'payment_status': paymentStatus}),
      ).timeout(const Duration(seconds: 8));
      return response.statusCode == 200;
    } catch (e) {
      return true;
    }
  }

  /// Purge all orders completely and reset counters to 0
  static Future<bool> purgeAllOrders() async {
    _cachedOrders.clear();
    try {
      final response = await http.delete(
        Uri.parse('$apiUrl?purgeAll=true'),
        headers: {
          'x-admin-token': 'ESP_SECURE_DESKTOP_TOKEN_2026_9f8d1c7a4b',
        },
      ).timeout(const Duration(seconds: 8));
      return response.statusCode == 200;
    } catch (e) {
      return true;
    }
  }
}
