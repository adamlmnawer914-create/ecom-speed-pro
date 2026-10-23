import 'package:flutter/material.dart';

class PricingPackage {
  final String id;
  final String name;
  final String subtitle;
  final String price;
  final double numericPrice;
  final String imagePath;
  final String badgeText;
  final IconData badgeIcon;
  final List<Color> badgeColors;
  final Color accentColor;
  final List<Color> buttonGradient;
  final List<String> features;

  const PricingPackage({
    required this.id,
    required this.name,
    required this.subtitle,
    required this.price,
    required this.numericPrice,
    required this.imagePath,
    required this.badgeText,
    required this.badgeIcon,
    required this.badgeColors,
    required this.accentColor,
    required this.buttonGradient,
    required this.features,
  });

  static List<PricingPackage> get defaultPackages => [
    const PricingPackage(
      id: 'landing-local',
      name: 'صفحة هبوط محلية (1,500 DH)',
      subtitle: 'صفحة هبوط احترافية فائقة السرعة موجهة للسوق المحلي 🇲🇦',
      price: '1,500 درهم',
      numericPrice: 1500,
      imagePath: 'assets/images/card_landing_new.webp',
      badgeText: 'الأكثر طلباً محلياً 🔥',
      badgeIcon: Icons.local_fire_department_rounded,
      badgeColors: [Color(0xFFDC2626), Color(0xFFF43F5E), Color(0xFF9333EA)],
      accentColor: Color(0xFFD946EF),
      buttonGradient: [Color(0xFFEF4444), Color(0xFFEC4899), Color(0xFF9333EA)],
      features: [
        'صفحة هبوط احترافية مخصصة لمنتج رابح محلي',
        'تصميم محفز ومضاعف لمعدل التحويل (High Conversion)',
        'استقبال فوري ومؤتمت للطلبات والتحويلات المباشرة',
        'سرعة تحميل فائقة وتوافق تام 100% مع جميع الهواتف',
      ],
    ),
    const PricingPackage(
      id: 'store-local',
      name: 'متجر محلي متكامل (3,000 DH)',
      subtitle: 'متجر مغربي متكامل بلوحة تحكم متقدمة وبوابات دفع محلية 🇲🇦',
      price: '3,000 درهم',
      numericPrice: 3000,
      imagePath: 'assets/images/card_standard_new.webp',
      badgeText: 'متجر متعدد المنتجات ⚡',
      badgeIcon: Icons.bolt_rounded,
      badgeColors: [Color(0xFF06B6D4), Color(0xFF3B82F6), Color(0xFF4F46E5)],
      accentColor: Color(0xFF06B6D4),
      buttonGradient: [Color(0xFF06B6D4), Color(0xFF2563EB), Color(0xFF4F46E5)],
      features: [
        'متجر مغربي متكامل متعدد الأقسام والمنتجات',
        'لوحة تحكم إدارية احترافية لتتبع وإدارة الطلبات',
        'ربط بوابات الدفع الإلكتروني المعتمدة (PayPal, Visa, Mastercard)',
        'واجهة متجاوبة 100% وسهلة الإدارة والتحديث',
      ],
    ),
    const PricingPackage(
      id: 'landing-intl',
      name: 'صفحة هبوط دولية (4,500 DH)',
      subtitle: 'صفحة هبوط مهيأة للأسواق الأمريكية والأوروبية والخليج 🌐',
      price: '4,500 درهم',
      numericPrice: 4500,
      imagePath: 'assets/images/card_landing_new.webp',
      badgeText: 'معدل تحويل دولي 🚀',
      badgeIcon: Icons.public_rounded,
      badgeColors: [Color(0xFF10B981), Color(0xFF059669), Color(0xFF047857)],
      accentColor: Color(0xFF10B981),
      buttonGradient: [Color(0xFF10B981), Color(0xFF059669), Color(0xFF047857)],
      features: [
        'صفحة هبوط دولية فائقة السرعة للأسواق العالمية',
        'دعم عملات ولغات متعددة ومعدلات تحويل عالمية',
        'ربط مباشر مع PayPal والبطاقات العالمية Visa و Mastercard',
        'بنية سحابية فائقة السرعة على خوادم عالمية',
      ],
    ),
    const PricingPackage(
      id: 'store-intl',
      name: 'متجر دولي VIP (9,000 DH)',
      subtitle: 'أقوى بنية برمجية سحابية دولية لكبار التجار والعلامات العالمية 👑',
      price: '9,000 درهم',
      numericPrice: 9000,
      imagePath: 'assets/images/card_saas_new.webp',
      badgeText: 'VIP سحابي عالمي 💎',
      badgeIcon: Icons.workspace_premium_rounded,
      badgeColors: [Color(0xFFF59E0B), Color(0xFFFBBF24), Color(0xFFD97706)],
      accentColor: Color(0xFFF59E0B),
      buttonGradient: [Color(0xFFF59E0B), Color(0xFFFBBF24), Color(0xFFD97706)],
      features: [
        'متجر دولي VIP سحابي متكامل متعدد اللغات والعملات',
        'دمج بوابات الدفع العالمية (PayPal, Visa, Mastercard)',
        'نظام مؤتمت للفواتير، وتتبع الشحنات، ونقاط البيع',
        'مدير حساب خاص ودعم فني متواصل مدار الساعة',
      ],
    ),
  ];
}
