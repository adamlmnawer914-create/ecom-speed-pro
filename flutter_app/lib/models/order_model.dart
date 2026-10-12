class OrderItem {
  final String id;
  final String customerName;
  final String customerCity;
  final String customerPhone;
  final String customerEmail;
  final String storeName;
  final String productPrice;
  final String orderPhone;
  final String planTitle;
  final double price;
  final String formattedPrice;
  final String paymentMethod;
  final List<String> productImages;
  final String productNotes;
  String status; // 'new', 'in_progress', 'completed'
  String? deliveredUrl;
  final String createdAt;

  OrderItem({
    required this.id,
    required this.customerName,
    this.customerCity = 'الدار البيضاء',
    required this.customerPhone,
    required this.customerEmail,
    this.storeName = '',
    this.productPrice = '',
    this.orderPhone = '',
    required this.planTitle,
    required this.price,
    required this.formattedPrice,
    required this.paymentMethod,
    required this.productImages,
    required this.productNotes,
    required this.status,
    this.deliveredUrl,
    required this.createdAt,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      id: json['id']?.toString() ?? '',
      customerName: json['customer_name']?.toString() ?? json['customerName']?.toString() ?? '',
      customerCity: json['customer_city']?.toString() ?? json['customerCity']?.toString() ?? json['city']?.toString() ?? 'الدار البيضاء',
      customerPhone: json['phone_number']?.toString() ?? json['customerPhone']?.toString() ?? json['phone']?.toString() ?? '',
      customerEmail: json['customer_email']?.toString() ?? json['customerEmail']?.toString() ?? json['email']?.toString() ?? '',
      storeName: json['store_name']?.toString() ?? json['storeName']?.toString() ?? '',
      productPrice: json['product_price']?.toString() ?? json['productPrice']?.toString() ?? '',
      orderPhone: json['order_phone']?.toString() ?? json['orderPhone']?.toString() ?? json['phone_number']?.toString() ?? json['customerPhone']?.toString() ?? '',
      planTitle: json['plan_tier']?.toString() ?? json['planTitle']?.toString() ?? '',
      price: (json['price'] is num) ? (json['price'] as num).toDouble() : 0.0,
      formattedPrice: json['formattedPrice']?.toString() ?? '${json['price']} درهم',
      paymentMethod: json['payment_method']?.toString() ?? json['paymentMethod']?.toString() ?? 'YouCan Pay',
      productImages: (json['product_images'] is List)
          ? (json['product_images'] as List).map((e) => e.toString()).toList()
          : (json['productImages'] is List)
              ? (json['productImages'] as List).map((e) => e.toString()).toList()
              : [],
      productNotes: json['product_notes']?.toString() ?? json['productNotes']?.toString() ?? '',
      status: json['status']?.toString() ?? 'new',
      deliveredUrl: json['delivered_url']?.toString() ?? json['deliveredUrl']?.toString(),
      createdAt: json['created_at']?.toString() ?? json['createdAt']?.toString() ?? DateTime.now().toIso8601String(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'customer_name': customerName,
      'customerName': customerName,
      'customer_city': customerCity,
      'customerCity': customerCity,
      'phone_number': customerPhone,
      'customerPhone': customerPhone,
      'customer_email': customerEmail,
      'customerEmail': customerEmail,
      'store_name': storeName,
      'storeName': storeName,
      'product_price': productPrice,
      'productPrice': productPrice,
      'order_phone': orderPhone,
      'orderPhone': orderPhone,
      'plan_tier': planTitle,
      'planTitle': planTitle,
      'price': price,
      'formattedPrice': formattedPrice,
      'payment_method': paymentMethod,
      'paymentMethod': paymentMethod,
      'product_images': productImages,
      'productImages': productImages,
      'product_notes': productNotes,
      'productNotes': productNotes,
      'status': status,
      'delivered_url': deliveredUrl,
      'deliveredUrl': deliveredUrl,
      'created_at': createdAt,
      'createdAt': createdAt,
    };
  }

  String get paymentMethodTitle {
    switch (paymentMethod.toLowerCase()) {
      case 'card':
        return 'البطاقة البنكية';
      case 'youcan':
      case 'youcan pay':
        return 'YouCan Pay 🇲🇦';
      case 'cmi':
        return 'CMI الإلكتروني';
      case 'whatsapp':
        return 'تحويل بنكي / واتساب';
      default:
        return paymentMethod;
    }
  }

  String get statusTitle {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'مكتمل ومسلّم 🟢';
      case 'in_progress':
        return 'جاري التجهيز 🔵';
      case 'new':
      case 'pending':
      default:
        return 'قيد المراجعة 🟡';
    }
  }
}
