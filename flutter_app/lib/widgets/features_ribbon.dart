import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';

class FeaturesRibbon extends StatelessWidget {
  const FeaturesRibbon({super.key});

  @override
  Widget build(BuildContext context) {
    final features = [
      {
        'icon': Icons.bolt_rounded,
        'title': 'برمجة وإطلاق فوري',
        'desc': 'تسليم كامل في 48 ساعة فقط',
        'color': AppTheme.neonCyan,
      },
      {
        'icon': Icons.support_agent_rounded,
        'title': 'دعم فني مخصص 24/7',
        'desc': 'مرافقة احترافية ومتابعة دائمة',
        'color': AppTheme.emeraldGreen,
      },
      {
        'icon': Icons.verified_user_rounded,
        'title': 'بوابات دفع رسمية',
        'desc': 'PayPal • Visa • Mastercard',
        'color': AppTheme.luxuryGold,
      },
      {
        'icon': Icons.workspace_premium_rounded,
        'title': 'ضمان استرجاع 30 يوماً',
        'desc': 'أعلى معايير الجودة والرضا',
        'color': AppTheme.fuchsiaPink,
      },
    ];

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.bgCardSurface.withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: AppTheme.neonCyan.withValues(alpha: 0.25),
          width: 1.2,
        ),
        boxShadow: [
          BoxShadow(
            color: AppTheme.neonCyan.withValues(alpha: 0.1),
            blurRadius: 20,
            spreadRadius: 1,
          ),
        ],
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth > 600;

          if (isWide) {
            return Row(
              children: features.map((feat) {
                return Expanded(
                  child: _FeatureItem(
                    icon: feat['icon'] as IconData,
                    title: feat['title'] as String,
                    desc: feat['desc'] as String,
                    accentColor: feat['color'] as Color,
                  ),
                );
              }).toList(),
            );
          } else {
            return Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: _FeatureItem(
                        icon: features[0]['icon'] as IconData,
                        title: features[0]['title'] as String,
                        desc: features[0]['desc'] as String,
                        accentColor: features[0]['color'] as Color,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: _FeatureItem(
                        icon: features[1]['icon'] as IconData,
                        title: features[1]['title'] as String,
                        desc: features[1]['desc'] as String,
                        accentColor: features[1]['color'] as Color,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    Expanded(
                      child: _FeatureItem(
                        icon: features[2]['icon'] as IconData,
                        title: features[2]['title'] as String,
                        desc: features[2]['desc'] as String,
                        accentColor: features[2]['color'] as Color,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: _FeatureItem(
                        icon: features[3]['icon'] as IconData,
                        title: features[3]['title'] as String,
                        desc: features[3]['desc'] as String,
                        accentColor: features[3]['color'] as Color,
                      ),
                    ),
                  ],
                ),
              ],
            );
          }
        },
      ),
    );
  }
}

class _FeatureItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final String desc;
  final Color accentColor;

  const _FeatureItem({
    required this.icon,
    required this.title,
    required this.desc,
    required this.accentColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: AppTheme.bgPrimary.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: accentColor.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 38,
            height: 38,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: accentColor.withValues(alpha: 0.15),
              border: Border.all(color: accentColor.withValues(alpha: 0.4)),
            ),
            child: Icon(icon, color: accentColor, size: 20),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  title,
                  style: GoogleFonts.cairo(
                    fontWeight: FontWeight.w800,
                    fontSize: 12,
                    color: Colors.white,
                  ),
                ),
                Text(
                  desc,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.cairo(
                    fontSize: 10,
                    fontWeight: FontWeight.w500,
                    color: AppTheme.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
