import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Store Light Theme Colors (Matching the attached screenshot exactly)
  static const Color bgStore = Color(0xFFEAF4FD);
  static const Color bgStoreSurface = Color(0xFFFFFFFF);
  static const Color navBorder = Color(0xFFCBE4FB);
  static const Color textDark = Color(0xFF0B1739);
  static const Color brandBlue = Color(0xFF2563EB);
  static const Color royalBlue = Color(0xFF1D4ED8);
  static const Color purpleAccent = Color(0xFF7928CA);
  static const Color whatsappGreen = Color(0xFF25D366);

  // Supporting / Legacy Palette (Shared across widgets)
  static const Color bgPrimary = Color(0xFF020718);
  static const Color bgSecondary = Color(0xFF051238);
  static const Color bgCard = Color(0xFF091D5A);
  static const Color bgCardSurface = Color(0xFF0D2466);
  static const Color bgCardHover = Color(0xFF142F7F);

  static const Color neonCyan = Color(0xFF00D2FF);
  static const Color electricBlue = Color(0xFF2563EB);
  static const Color royalIndigo = Color(0xFF4F46E5);
  static const Color fuchsiaPink = Color(0xFFD946EF);
  static const Color neonRose = Color(0xFFF43F5E);
  static const Color luxuryGold = Color(0xFFF59E0B);
  static const Color brightGold = Color(0xFFFBBF24);
  static const Color emeraldGreen = Color(0xFF10B981);

  static const Color textPrimary = Color(0xFFFFFFFF);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color textMuted = Color(0xFF94A3B8);

  // Gradients
  static const LinearGradient activeNavGradient = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [Color(0xFF00B4D8), Color(0xFF3A86FF), Color(0xFF7209B7)],
  );

  static const LinearGradient heroTextGradient = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [Color(0xFF00D2FF), Color(0xFF4361EE), Color(0xFF7928CA)],
  );

  static const LinearGradient orderBtnGradient = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [Color(0xFF00C8FF), Color(0xFF3A86FF), Color(0xFF8338EC)],
  );

  static const LinearGradient primaryButtonGradient = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [Color(0xFF00C8FF), Color(0xFF3A86FF), Color(0xFF8338EC)],
  );

  static const LinearGradient goldButtonGradient = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [Color(0xFFF59E0B), Color(0xFFFBBF24), Color(0xFFD97706)],
  );

  static const LinearGradient creditCardGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFF0B215E),
      Color(0xFF040D26),
      Color(0xFF15337C),
      Color(0xFF020617),
    ],
    stops: [0.0, 0.45, 0.75, 1.0],
  );

  static ThemeData get lightTheme {
    final baseTextTheme = GoogleFonts.cairoTextTheme(ThemeData.light().textTheme);

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: bgStore,
      primaryColor: brandBlue,
      colorScheme: const ColorScheme.light(
        primary: brandBlue,
        secondary: purpleAccent,
        surface: bgStoreSurface,
        onSurface: textDark,
      ),
      textTheme: baseTextTheme.apply(
        bodyColor: textDark,
        displayColor: textDark,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        iconTheme: IconThemeData(color: brandBlue),
      ),
      cardTheme: CardThemeData(
        color: bgStoreSurface,
        elevation: 6,
        shadowColor: brandBlue.withValues(alpha: 0.12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
          side: const BorderSide(color: navBorder, width: 1.2),
        ),
      ),
    );
  }
}
