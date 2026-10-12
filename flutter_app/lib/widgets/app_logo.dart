import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';

class AppLogo extends StatelessWidget {
  final double size;
  final bool showText;
  final bool compact;

  const AppLogo({
    super.key,
    this.size = 42,
    this.showText = true,
    this.compact = false,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // 3D Emblem Container with glowing cyan halo
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: const RadialGradient(
              colors: [
                Color(0x5506B6D4),
                Color(0x222563EB),
                Colors.transparent,
              ],
            ),
            boxShadow: [
              BoxShadow(
                color: AppTheme.neonCyan.withValues(alpha: 0.35),
                blurRadius: 16,
                spreadRadius: 2,
              ),
            ],
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(size),
            child: Image.asset(
              'assets/images/ecom_letter_e_logo.png',
              fit: BoxFit.contain,
              errorBuilder: (context, error, stackTrace) {
                // Fallback to text emblem if asset error
                return Container(
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: AppTheme.primaryButtonGradient,
                  ),
                  child: const Center(
                    child: Text(
                      'E',
                      style: TextStyle(
                        fontWeight: FontWeight.w900,
                        color: Colors.white,
                        fontSize: 22,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ),

        if (showText) ...[
          const SizedBox(width: 10),
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Main Brand Name
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'ECOM',
                    style: GoogleFonts.outfit(
                      fontWeight: FontWeight.w900,
                      fontSize: compact ? 16 : 19,
                      letterSpacing: 1.2,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(width: 4),
                  ShaderMask(
                    shaderCallback: (bounds) => const LinearGradient(
                      colors: [AppTheme.neonCyan, Color(0xFF60A5FA)],
                    ).createShader(bounds),
                    child: Text(
                      'SPEED',
                      style: GoogleFonts.outfit(
                        fontWeight: FontWeight.w900,
                        fontSize: compact ? 16 : 19,
                        letterSpacing: 1.2,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const SizedBox(width: 5),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                    decoration: BoxDecoration(
                      gradient: AppTheme.goldButtonGradient,
                      borderRadius: BorderRadius.circular(6),
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.luxuryGold.withValues(alpha: 0.4),
                          blurRadius: 6,
                        ),
                      ],
                    ),
                    child: Text(
                      'PRO',
                      style: GoogleFonts.outfit(
                        fontWeight: FontWeight.w900,
                        fontSize: compact ? 9 : 11,
                        color: const Color(0xFF040B1E),
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
                ],
              ),

              if (!compact) ...[
                const SizedBox(height: 1),
                Text(
                  'حلول التجارة والتسويق الرقمي',
                  style: GoogleFonts.cairo(
                    fontSize: 10,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.neonCyan.withValues(alpha: 0.85),
                    letterSpacing: 0.3,
                  ),
                ),
              ],
            ],
          ),
        ],
      ],
    );
  }
}
