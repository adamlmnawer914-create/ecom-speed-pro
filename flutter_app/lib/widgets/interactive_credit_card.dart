import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';

class InteractiveCreditCard extends StatelessWidget {
  final String cardNumber;
  final String cardHolder;
  final String expiryDate;
  final String cardType; // 'visa', 'mastercard'

  const InteractiveCreditCard({
    super.key,
    required this.cardNumber,
    required this.cardHolder,
    required this.expiryDate,
    this.cardType = 'visa',
  });

  String get formattedCardNumber {
    final cleaned = cardNumber.replaceAll(RegExp(r'\s+\b|\b\s'), '');
    if (cleaned.isEmpty) return '•••• •••• •••• ••••';
    
    // Mask and format in groups of 4
    final buffer = StringBuffer();
    for (int i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 == 0) buffer.write('  ');
      buffer.write(cleaned[i]);
    }
    // Pad remaining
    while (buffer.length < 22) {
      if ((buffer.length + 1) % 5 == 0) buffer.write(' ');
      buffer.write('•');
    }
    return buffer.toString();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 200,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: AppTheme.creditCardGradient,
        border: Border.all(
          color: AppTheme.neonCyan.withValues(alpha: 0.45),
          width: 1.5,
        ),
        boxShadow: [
          BoxShadow(
            color: AppTheme.neonCyan.withValues(alpha: 0.25),
            blurRadius: 30,
            spreadRadius: 2,
            offset: const Offset(0, 10),
          ),
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.6),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Stack(
        children: [
          // Background cybernetic decorative circles
          Positioned(
            right: -30,
            top: -30,
            child: Container(
              width: 140,
              height: 140,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    AppTheme.neonCyan.withValues(alpha: 0.25),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),
          Positioned(
            left: -40,
            bottom: -40,
            child: Container(
              width: 160,
              height: 160,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    AppTheme.royalIndigo.withValues(alpha: 0.35),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),

          // Main Card Content
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Top Row: Chip & Wireless & Bank / Brand Logo
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Metallic Chip & Contactless
                    Row(
                      children: [
                        // Chip
                        Container(
                          width: 44,
                          height: 32,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(6),
                            gradient: const LinearGradient(
                              colors: [
                                Color(0xFFFFE082),
                                Color(0xFFFFB300),
                                Color(0xFFFF8F00),
                              ],
                            ),
                            border: Border.all(color: Colors.amber.shade200, width: 1),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.amber.withValues(alpha: 0.4),
                                blurRadius: 6,
                              ),
                            ],
                          ),
                          child: Stack(
                            children: [
                              Center(
                                child: Container(
                                  width: 24,
                                  height: 16,
                                  decoration: BoxDecoration(
                                    border: Border.all(
                                      color: Colors.brown.withValues(alpha: 0.3),
                                      width: 1,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 10),
                        // Contactless Waves
                        const Icon(
                          Icons.wifi_rounded,
                          color: Colors.white70,
                          size: 20,
                        ),
                      ],
                    ),

                    // Top Right Security Badge
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.white24),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.lock_rounded, size: 12, color: AppTheme.neonCyan),
                          const SizedBox(width: 4),
                          Text(
                            'SSL 256-BIT',
                            style: GoogleFonts.outfit(
                              fontSize: 10,
                              fontWeight: FontWeight.w800,
                              color: Colors.white,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),

                // Middle: Card Number (Embossed look)
                Directionality(
                  textDirection: TextDirection.ltr,
                  child: Text(
                    cardNumber.isEmpty ? '4242  ••••  ••••  4242' : formattedCardNumber,
                    style: GoogleFonts.shareTechMono(
                      fontSize: 19,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 2.2,
                      color: Colors.white,
                      shadows: [
                        Shadow(
                          color: Colors.black.withValues(alpha: 0.8),
                          offset: const Offset(1, 2),
                          blurRadius: 4,
                        ),
                      ],
                    ),
                  ),
                ),

                // Bottom Row: Holder Name, Expiry, and Brand Hologram
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    // Cardholder Name
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'حامل البطاقة',
                            style: GoogleFonts.cairo(
                              fontSize: 10,
                              color: AppTheme.textSecondary,
                            ),
                          ),
                          Text(
                            cardHolder.isEmpty ? 'YOUR NAME' : cardHolder.toUpperCase(),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: GoogleFonts.outfit(
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                              letterSpacing: 0.8,
                            ),
                          ),
                        ],
                      ),
                    ),

                    // Expiry Date
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          'تنتهي في',
                          style: GoogleFonts.cairo(
                            fontSize: 10,
                            color: AppTheme.textSecondary,
                          ),
                        ),
                        Directionality(
                          textDirection: TextDirection.ltr,
                          child: Text(
                            expiryDate.isEmpty ? '12/28' : expiryDate,
                            style: GoogleFonts.shareTechMono(
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                              letterSpacing: 1.0,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(width: 16),

                    // Brand Hologram (Visa/Mastercard)
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 20,
                          height: 20,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: const Color(0xFFEB001B).withValues(alpha: 0.85),
                          ),
                        ),
                        Transform.translate(
                          offset: const Offset(-8, 0),
                          child: Container(
                            width: 20,
                            height: 20,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: const Color(0xFFF79E1B).withValues(alpha: 0.85),
                            ),
                          ),
                        ),
                      ],
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
