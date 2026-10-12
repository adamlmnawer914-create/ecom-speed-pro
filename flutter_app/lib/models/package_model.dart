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
      id: 'landing',
      name: 'صفحة الهبوط (Landing Page)',
      subtitle: 'تصميم مخصص لتحقيق أعلى معدل تحويل لمنتج رابح',
      price: '500 درهم',
      numericPrice: 500,
      imagePath: 'assets/images/card_landing_new.webp',
      badgeText: 'الأكثر طلباً',
      badgeIcon: Icons.local_fire_department_rounded,
      badgeColors: [Color(0xFFDC2626), Color(0xFFF43F5E), Color(0xFF9333EA)],
      accentColor: Color(0xFFD946EF),
      buttonGradient: [Color(0xFFEF4444), Color(0xFFEC4899), Color(0xFF9333EA)],
      features: [
        'صفحة هبوط احترافية مخصصة لمنتج رابح (Winner Product)',
        'تصميم محفز ومضاعف لمعدل التحويل (High Conversion)',
        'استقبال فوري ومؤتمت للطلبات والتحويلات المباشرة',
        'سرعة تحميل فائقة وتوافق تام 100% مع جميع الهواتف',
      ],
    ),
    const PricingPackage(
      id: 'standard',
      name: 'المتجر القياسي (Standard Store)',
      subtitle: 'متجر متكامل متعدد المنتجات للعلامات التجارية الطموحة',
      price: '1500 درهم',
      numericPrice: 1500,
      imagePath: 'assets/images/card_standard_new.webp',
      badgeText: 'الأكثر مبيعاً',
      badgeIcon: Icons.bolt_rounded,
      badgeColors: [Color(0xFF06B6D4), Color(0xFF3B82F6), Color(0xFF4F46E5)],
      accentColor: Color(0xFF06B6D4),
      buttonGradient: [Color(0xFF06B6D4), Color(0xFF2563EB), Color(0xFF4F46E5)],
      features: [
        'عرض منتجات متعددة بتصميم عصري جذاب ومرتب',
        'نظام سلس ومتكامل لاستقبال وتتبع وإدارة الطلبات',
        'ربط بوابات الدفع الإلكتروني المؤتمتة (YouCan Pay, CMI)',
        'واجهة متجاوبة 100% وسهلة الإدارة والتحديث',
      ],
    ),
    const PricingPackage(
      id: 'saas',
      name: 'منصة التجارة المتقدمة (Advanced SaaS)',
      subtitle: 'حل برمجي VIP متكامل لكبار التجار والشركات التوسعية',
      price: '5000 درهم',
      numericPrice: 5000,
      imagePath: 'assets/images/card_saas_new.webp',
      badgeText: 'الخيار الأقوى',
      badgeIcon: Icons.workspace_premium_rounded,
      badgeColors: [Color(0xFFF59E0B), Color(0xFFFBBF24), Color(0xFFD97706)],
      accentColor: Color(0xFFF59E0B),
      buttonGradient: [Color(0xFFF59E0B), Color(0xFFFBBF24), Color(0xFFD97706)],
      features: [
        'نظام متكامل بلوحة تحكم إدارية احترافية (Dashboard)',
        'دمج بوابات الدفع الإلكترونية المؤتمتة (YouCan Pay, CMI)',
        'إرسال فواتير وإشعارات أوتوماتيكية للزبائن',
        'ملكية النظام مدى الحياة بدون أي اشتراكات شهرية',
      ],
    ),
  ];
}
