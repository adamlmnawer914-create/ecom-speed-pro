import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';

class HeroStatsSection extends StatelessWidget {
  const HeroStatsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth > 700;

          if (isWide) {
            return Row(
              children: [
                Expanded(
                  child: _StatCard(
                    number: '100%',
                    title: 'رفع نسبة المبيعات',
                    subtitle: 'تحسين مباشر لمعدلات التحويل',
                    accentColor: AppTheme.emeraldGreen,
                    icon: Icons.trending_up_rounded,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: _StatCard(
                    number: '20+',
                    title: 'متجر تم إطلاقه بنجاح',
                    subtitle: 'مشاريع رائدة في المغرب والخليج',
                    accentColor: AppTheme.neonCyan,
                    icon: Icons.rocket_launch_rounded,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: _StatCard(
                    number: 'SSL 256',
                    title: 'تشفير بنكي 100%',
                    subtitle: 'حماية شاملة لبيانات الدفع',
                    accentColor: AppTheme.luxuryGold,
                    icon: Icons.verified_user_rounded,
                  ),
                ),
              ],
            );
          } else {
            return Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: _StatCard(
                        number: '100%',
                        title: 'رفع نسبة المبيعات',
                        subtitle: 'تحسين مباشر للتحويل',
                        accentColor: AppTheme.emeraldGreen,
                        icon: Icons.trending_up_rounded,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: _StatCard(
                        number: '20+',
                        title: 'متجر تم إطلاقه',
                        subtitle: 'مشاريع رائدة بنجاح',
                        accentColor: AppTheme.neonCyan,
                        icon: Icons.rocket_launch_rounded,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                _StatCard(
                  number: 'SSL 256-Bit',
                  title: 'دفع إلكتروني آمن وتشفير بنكي 100%',
                  subtitle: 'حماية شاملة لبيانات الدفع وبوابات رسمية معتمدة',
                  accentColor: AppTheme.luxuryGold,
                  icon: Icons.verified_user_rounded,
                  isFullWidth: true,
                ),
              ],
            );
          }
        },
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String number;
  final String title;
  final String subtitle;
  final Color accentColor;
  final IconData icon;
  final bool isFullWidth;

  const _StatCard({
    required this.number,
    required this.title,
    required this.subtitle,
    required this.accentColor,
    required this.icon,
    this.isFullWidth = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        color: AppTheme.bgCardSurface.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: accentColor.withValues(alpha: 0.35),
          width: 1.2,
        ),
        boxShadow: [
          BoxShadow(
            color: accentColor.withValues(alpha: 0.12),
            blurRadius: 18,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: accentColor.withValues(alpha: 0.15),
              border: Border.all(color: accentColor.withValues(alpha: 0.4)),
            ),
            child: Icon(icon, color: accentColor, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                ShaderMask(
                  shaderCallback: (bounds) => LinearGradient(
                    colors: [accentColor, Colors.white],
                  ).createShader(bounds),
                  child: Text(
                    number,
                    style: GoogleFonts.outfit(
                      fontSize: 18,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                      letterSpacing: 0.5,
                    ),
                  ),
                ),
                Text(
                  title,
                  style: GoogleFonts.cairo(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    color: Colors.white,
                  ),
                ),
                Text(
                  subtitle,
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
