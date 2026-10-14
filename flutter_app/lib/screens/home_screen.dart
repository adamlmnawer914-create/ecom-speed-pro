import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/package_model.dart';
import '../theme/app_theme.dart';
import 'checkout_screen.dart';
import 'admin_dashboard_screen.dart';

class HomeScreen extends StatefulWidget {
  final Function(int)? onNavigateTab;

  const HomeScreen({
    super.key,
    this.onNavigateTab,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ScrollController _scrollController = ScrollController();
  final GlobalKey _servicesKey = GlobalKey();

  Future<void> _launchWhatsApp() async {
    final url = Uri.parse(
      'https://wa.me/212762357491?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20ECOM%20SPEED%20PRO%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%AC%D8%B1.',
    );
    if (await canLaunchUrl(url)) {
      await launchUrl(url, mode: LaunchMode.externalApplication);
    }
  }

  void _scrollToServices() {
    Scrollable.ensureVisible(
      _servicesKey.currentContext!,
      duration: const Duration(milliseconds: 600),
      curve: Curves.easeInOut,
    );
  }

  void _openCheckout(PricingPackage package) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CheckoutScreen(selectedPackage: package),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final packages = PricingPackage.defaultPackages;

    return Scaffold(
      backgroundColor: const Color(0xFFEAF4FD),
      body: Stack(
        children: [
          // Background Atmosphere matching store_bg_master.webp
          Positioned.fill(
            child: Image.asset(
              'assets/images/store_bg_master.webp',
              fit: BoxFit.cover,
              alignment: Alignment.topCenter,
              errorBuilder: (context, error, stackTrace) => Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Color(0xFFEAF4FD), Color(0xFFDCEBFA), Color(0xFFEAF4FD)],
                  ),
                ),
              ),
            ),
          ),

          // Main Scrollable Content
          SafeArea(
            child: SingleChildScrollView(
              controller: _scrollController,
              padding: const EdgeInsets.only(bottom: 60),
              child: Column(
                children: [
                  // 1. The Exact Curved Floating White Pill Navbar from Screenshot
                  _buildNavbar(context),

                  const SizedBox(height: 12),

                  // 2. The Exact Hero Section from Screenshot
                  _buildHeroSection(context, packages),

                  const SizedBox(height: 24),

                  // 3. The Exact 5-Items Features Ribbon from Screenshot
                  _buildFeaturesRibbon(),

                  const SizedBox(height: 32),

                  // 4. Section Title: "خدماتنا المميزة" with lines and sparkles
                  _buildSectionTitle(),

                  const SizedBox(height: 18),

                  // 5. The 3 Luxury Packages Cards in equal height layout
                  _buildPricingCards(packages),

                  const SizedBox(height: 30),
                ],
              ),
            ),
          ),

          // Floating WhatsApp Action Button in Bottom Corner
          Positioned(
            bottom: 20,
            left: 20, // In RTL, left is bottom-left / corner
            child: GestureDetector(
              onTap: _launchWhatsApp,
              child: Container(
                width: 58,
                height: 58,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: const Color(0xFF25D366),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF25D366).withValues(alpha: 0.5),
                      blurRadius: 18,
                      spreadRadius: 2,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: const Center(
                  child: Icon(Icons.chat_bubble_rounded, color: Colors.white, size: 30),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ===========================================================================
  // 1. TOP NAVBAR (Matching the attached screenshot exactly)
  // ===========================================================================
  Widget _buildNavbar(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.95),
        borderRadius: BorderRadius.circular(50),
        border: Border.all(color: const Color(0xFFCBE4FB), width: 1.2),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF2563EB).withValues(alpha: 0.08),
            blurRadius: 20,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth > 750;

          return Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Search and Admin Buttons on the LEFT
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    height: 38,
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(30),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 26,
                          height: 26,
                          decoration: const BoxDecoration(
                            shape: BoxShape.circle,
                            color: Color(0xFF2563EB),
                          ),
                          child: const Icon(Icons.search_rounded, size: 14, color: Colors.white),
                        ),
                        if (constraints.maxWidth > 500) ...[
                          const SizedBox(width: 8),
                          Text(
                            '... ابحث عن خدمة أو منتج',
                            style: GoogleFonts.cairo(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: const Color(0xFF94A3B8),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ],
              ),

              // Center Navigation Links (Visible on Wide screens)
              if (isWide)
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _navLink('اتصل بنا', () => _launchWhatsApp()),
                    const SizedBox(width: 14),
                    _navLink('من نحن', () => _scrollToServices()),
                    const SizedBox(width: 14),
                    _navLink('الخدمات ∨', () => _scrollToServices()),
                    const SizedBox(width: 14),
                    // Active "الرئيسية" pill button
                    // Active "الرئيسية" pill button
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 7),
                      decoration: BoxDecoration(
                        gradient: AppTheme.activeNavGradient,
                        borderRadius: BorderRadius.circular(30),
                        boxShadow: [
                          BoxShadow(
                            color: const Color(0xFF3A86FF).withValues(alpha: 0.4),
                            blurRadius: 12,
                          ),
                        ],
                      ),
                      child: Text(
                        'الرئيسية',
                        style: GoogleFonts.cairo(
                          fontSize: 12,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),

              // Brand Logo on the RIGHT with 3D emblem
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1.5),
                            decoration: BoxDecoration(
                              color: const Color(0xFF7209B7),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              'PRO',
                              style: GoogleFonts.outfit(
                                fontSize: 10,
                                fontWeight: FontWeight.w900,
                                color: Colors.white,
                              ),
                            ),
                          ),
                          const SizedBox(width: 4),
                          ShaderMask(
                            shaderCallback: (bounds) => const LinearGradient(
                              colors: [Color(0xFF00B4D8), Color(0xFF3A86FF)],
                            ).createShader(bounds),
                            child: Text(
                              'SPEED',
                              style: GoogleFonts.outfit(
                                fontSize: 16,
                                fontWeight: FontWeight.w900,
                                color: Colors.white,
                              ),
                            ),
                          ),
                          const SizedBox(width: 4),
                          Text(
                            'ECOM',
                            style: GoogleFonts.outfit(
                              fontSize: 16,
                              fontWeight: FontWeight.w900,
                              color: const Color(0xFF0B1739),
                            ),
                          ),
                        ],
                      ),
                      Text(
                        'حلول التجارة الإلكترونية والتسويق الرقمي',
                        style: GoogleFonts.cairo(
                          fontSize: 9,
                          fontWeight: FontWeight.w600,
                          color: const Color(0xFF2563EB),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(width: 8),
                  // 3D Emblem
                  SizedBox(
                    width: 36,
                    height: 36,
                    child: Image.asset(
                      'assets/images/ecom_letter_e_logo.png',
                      fit: BoxFit.contain,
                      errorBuilder: (context, error, stackTrace) => const Icon(
                        Icons.store_rounded,
                        color: Color(0xFF2563EB),
                        size: 30,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _navLink(String title, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      child: Text(
        title,
        style: GoogleFonts.cairo(
          fontSize: 13,
          fontWeight: FontWeight.w800,
          color: const Color(0xFF0B1739),
        ),
      ),
    );
  }

  // ===========================================================================
  // 2. HERO SECTION (Matching the attached screenshot exactly)
  // ===========================================================================
  Widget _buildHeroSection(BuildContext context, List<PricingPackage> packages) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isDesktop = constraints.maxWidth > 850;

          if (isDesktop) {
            return Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Left in RTL: 3D Showcase Mockup Card
                Expanded(
                  flex: 5,
                  child: _heroMockupCard(),
                ),
                const SizedBox(width: 32),
                // Right in RTL: Headlines & CTAs
                Expanded(
                  flex: 6,
                  child: _heroTextContent(packages),
                ),
              ],
            );
          } else {
            return Column(
              children: [
                _heroTextContent(packages),
                const SizedBox(height: 24),
                _heroMockupCard(),
              ],
            );
          }
        },
      ),
    );
  }

  Widget _heroTextContent(List<PricingPackage> packages) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Headline Line 1: "متجرك الإلكتروني الاحترافي"
        Text(
          'متجرك الإلكتروني الاحترافي',
          textAlign: TextAlign.center,
          style: GoogleFonts.cairo(
            fontSize: 34,
            fontWeight: FontWeight.w900,
            color: const Color(0xFF0B1739),
            height: 1.2,
          ),
        ),

        // Headline Line 2: "جاهزٌ للنجاح الآن" with cyan-blue-purple gradient
        ShaderMask(
          shaderCallback: (bounds) => AppTheme.heroTextGradient.createShader(bounds),
          child: Text(
            'جاهزٌ للنجاح الآن',
            textAlign: TextAlign.center,
            style: GoogleFonts.cairo(
              fontSize: 38,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              height: 1.25,
            ),
          ),
        ),

        const SizedBox(height: 14),

        // Subtitle matching screenshot exactly
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Text(
            'احصل على متجر إلكتروني متكامل مع تصميم عصري وتجربة مستخدم استثنائية\nبالإضافة إلى منصة هووية احترافية لزيادة المبيعات وتحقيق أفضل النتائج.',
            textAlign: TextAlign.center,
            style: GoogleFonts.cairo(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: const Color(0xFF1E293B),
              height: 1.6,
            ),
          ),
        ),

        const SizedBox(height: 22),

        // The Two CTA Buttons from screenshot
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Button 1: "اطلب الآن" with shopping cart
            GestureDetector(
              onTap: () => _openCheckout(packages[1]),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 12),
                decoration: BoxDecoration(
                  gradient: AppTheme.orderBtnGradient,
                  borderRadius: BorderRadius.circular(30),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF8338EC).withValues(alpha: 0.5),
                      blurRadius: 20,
                      offset: const Offset(0, 4),
                    ),
                    BoxShadow(
                      color: const Color(0xFF00C8FF).withValues(alpha: 0.35),
                      blurRadius: 30,
                    ),
                  ],
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.shopping_cart_rounded, color: Colors.white, size: 18),
                    const SizedBox(width: 8),
                    Text(
                      'اطلب الآن',
                      style: GoogleFonts.cairo(
                        fontSize: 15,
                        fontWeight: FontWeight.w900,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(width: 14),

            // Button 2: "اكتشف خدماتنا >" white with blue border
            GestureDetector(
              onTap: _scrollToServices,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 11),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(30),
                  border: Border.all(color: const Color(0xFF2563EB), width: 2),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF2563EB).withValues(alpha: 0.08),
                      blurRadius: 10,
                      offset: const Offset(0, 3),
                    ),
                  ],
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.chevron_left_rounded, color: Color(0xFF1D4ED8), size: 20),
                    const SizedBox(width: 4),
                    Text(
                      'اكتشف خدماتنا',
                      style: GoogleFonts.cairo(
                        fontSize: 14,
                        fontWeight: FontWeight.w900,
                        color: const Color(0xFF1D4ED8),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _heroMockupCard() {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(28),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF1E3A8A).withValues(alpha: 0.22),
            blurRadius: 40,
            spreadRadius: 2,
            offset: const Offset(0, 14),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(28),
        child: Image.asset(
          'assets/images/hero_showcase_luxury.webp',
          fit: BoxFit.cover,
          errorBuilder: (context, error, stackTrace) => Image.asset(
            'assets/images/hero_showcase_luxury.png',
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }

  // ===========================================================================
  // 3. THE 5-ITEMS FEATURES RIBBON (Matching screenshot exactly)
  // ===========================================================================
  Widget _buildFeaturesRibbon() {
    final ribbonItems = [
      {
        'title': 'تخصيص متكامل',
        'desc': 'حسب احتياجاتك',
        'icon': Icons.settings_suggest_rounded,
        'color': const Color(0xFF2563EB),
      },
      {
        'title': 'تصميم احترافي',
        'desc': 'يتناسب مع علامتك',
        'icon': Icons.bar_chart_rounded,
        'color': const Color(0xFF06B6D4),
      },
      {
        'title': 'تسليم سريع',
        'desc': 'في أقل وقت ممكن',
        'icon': Icons.rocket_launch_rounded,
        'color': const Color(0xFF8B5CF6),
      },
      {
        'title': 'أمان وحماية',
        'desc': 'لحسابك وبياناتك',
        'icon': Icons.shield_rounded,
        'color': const Color(0xFF0284C7),
      },
      {
        'title': 'دعم فني مستمر',
        'desc': 'نحن معك دائماً',
        'icon': Icons.headset_mic_rounded,
        'color': const Color(0xFF3B82F6),
      },
    ];

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(50),
        border: Border.all(color: const Color(0xFFCBE4FB), width: 1.2),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF2563EB).withValues(alpha: 0.08),
            blurRadius: 24,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth > 800;

          if (isWide) {
            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: ribbonItems.map((item) {
                return _ribbonItem(
                  title: item['title'] as String,
                  desc: item['desc'] as String,
                  icon: item['icon'] as IconData,
                  color: item['color'] as Color,
                );
              }).toList(),
            );
          } else {
            return Wrap(
              alignment: WrapAlignment.center,
              spacing: 16,
              runSpacing: 14,
              children: ribbonItems.map((item) {
                return _ribbonItem(
                  title: item['title'] as String,
                  desc: item['desc'] as String,
                  icon: item['icon'] as IconData,
                  color: item['color'] as Color,
                );
              }).toList(),
            );
          }
        },
      ),
    );
  }

  Widget _ribbonItem({
    required String title,
    required String desc,
    required IconData icon,
    required Color color,
  }) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              title,
              style: GoogleFonts.cairo(
                fontSize: 12,
                fontWeight: FontWeight.w900,
                color: const Color(0xFF0B1739),
              ),
            ),
            Text(
              desc,
              style: GoogleFonts.cairo(
                fontSize: 10,
                fontWeight: FontWeight.w600,
                color: const Color(0xFF64748B),
              ),
            ),
          ],
        ),
        const SizedBox(width: 8),
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: color.withValues(alpha: 0.12),
            border: Border.all(color: color.withValues(alpha: 0.35)),
          ),
          child: Icon(icon, color: color, size: 20),
        ),
      ],
    );
  }

  // ===========================================================================
  // 4. SECTION TITLE: "خدماتنا المميزة"
  // ===========================================================================
  Widget _buildSectionTitle() {
    return Container(
      key: _servicesKey,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 50,
            height: 2,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.transparent, Color(0xFF2563EB)],
              ),
            ),
          ),
          const SizedBox(width: 10),
          Text(
            'خدماتنا المميزة',
            style: GoogleFonts.cairo(
              fontSize: 26,
              fontWeight: FontWeight.w900,
              color: const Color(0xFF1D4ED8),
            ),
          ),
          const SizedBox(width: 8),
          const Icon(Icons.auto_awesome_rounded, color: Color(0xFF2563EB), size: 22),
          const SizedBox(width: 10),
          Container(
            width: 50,
            height: 2,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF2563EB), Colors.transparent],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ===========================================================================
  // 5. THE 3 RECTANGULAR LUXURY PACKAGES CARDS
  // ===========================================================================
  Widget _buildPricingCards(List<PricingPackage> packages) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isDesktop = constraints.maxWidth > 950;

        if (isDesktop) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 18),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: packages.map((pkg) {
                return Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    child: _packageCardItem(pkg),
                  ),
                );
              }).toList(),
            ),
          );
        } else {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              children: packages.map((pkg) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 20),
                  child: _packageCardItem(pkg),
                );
              }).toList(),
            ),
          );
        }
      },
    );
  }

  Widget _packageCardItem(PricingPackage pkg) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.95),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(
          color: pkg.accentColor.withValues(alpha: 0.4),
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: pkg.accentColor.withValues(alpha: 0.18),
            blurRadius: 28,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // 16:9 Image Area with floating luxury badge
          Stack(
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(30)),
                child: AspectRatio(
                  aspectRatio: 16 / 9,
                  child: Image.asset(
                    pkg.imagePath,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              Positioned(
                top: 12,
                right: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(colors: pkg.badgeColors),
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: pkg.accentColor.withValues(alpha: 0.5),
                        blurRadius: 10,
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        pkg.badgeText,
                        style: GoogleFonts.cairo(
                          fontSize: 11,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(pkg.badgeIcon, size: 14, color: Colors.white),
                    ],
                  ),
                ),
              ),
            ],
          ),

          // Content
          Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  pkg.name,
                  style: GoogleFonts.cairo(
                    fontSize: 17,
                    fontWeight: FontWeight.w900,
                    color: const Color(0xFF0B1739),
                  ),
                ),
                const SizedBox(height: 3),
                Text(
                  pkg.subtitle,
                  style: GoogleFonts.cairo(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: const Color(0xFF475569),
                  ),
                ),
                const SizedBox(height: 14),

                // Features list
                ...pkg.features.map(
                  (feat) => Padding(
                    padding: const EdgeInsets.only(bottom: 7),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 18,
                          height: 18,
                          margin: const EdgeInsets.only(top: 2),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: pkg.accentColor.withValues(alpha: 0.15),
                          ),
                          child: Icon(Icons.check, size: 11, color: pkg.accentColor),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            feat,
                            style: GoogleFonts.cairo(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: const Color(0xFF1E293B),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Bottom Action: Price Capsule + Order Button
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(colors: pkg.buttonGradient),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        pkg.price,
                        style: GoogleFonts.cairo(
                          fontSize: 13,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: GestureDetector(
                        onTap: () => _openCheckout(pkg),
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 9),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(colors: pkg.buttonGradient),
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: [
                              BoxShadow(
                                color: pkg.accentColor.withValues(alpha: 0.4),
                                blurRadius: 14,
                                offset: const Offset(0, 3),
                              ),
                            ],
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(Icons.shopping_cart_rounded, size: 16, color: Colors.white),
                              const SizedBox(width: 6),
                              Text(
                                'الطلب الآن',
                                style: GoogleFonts.cairo(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w900,
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
