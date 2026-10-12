import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'home_screen.dart';

class LiveWebScreen extends StatefulWidget {
  const LiveWebScreen({super.key});

  @override
  State<LiveWebScreen> createState() => _LiveWebScreenState();
}

class _LiveWebScreenState extends State<LiveWebScreen> {
  late final WebViewController _controller;
  int _progress = 0;
  bool _hasError = false;

  static const String storeUrl = 'https://ecom-speed-pro.vercel.app/';

  @override
  void initState() {
    super.initState();
    if (!kIsWeb) {
      _initWebView();
    }
  }

  void _initWebView() {
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFFEAF4FD))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            if (mounted) {
              setState(() {
                _progress = progress;
              });
            }
          },
          onPageStarted: (String url) {
            if (mounted) {
              setState(() {
                _hasError = false;
              });
            }
          },
          onPageFinished: (String url) {
            if (mounted) {
              setState(() {
                _progress = 100;
              });
            }
          },
          onWebResourceError: (WebResourceError error) {
            if (error.isForMainFrame ?? true) {
              if (mounted) {
                setState(() {
                  _hasError = true;
                });
              }
            }
          },
          onNavigationRequest: (NavigationRequest request) {
            final url = request.url;
            // Intercept WhatsApp, Phone Calls, and Emails to launch natively
            if (url.startsWith('https://wa.me/') ||
                url.startsWith('whatsapp://') ||
                url.startsWith('tel:') ||
                url.startsWith('mailto:')) {
              _launchExternal(url);
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(storeUrl));
  }

  Future<void> _launchExternal(String urlStr) async {
    final uri = Uri.parse(urlStr);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    // If running in Flutter Web / Desktop where WebView is not available, show native screen
    if (kIsWeb) {
      return const HomeScreen();
    }

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        if (await _controller.canGoBack()) {
          _controller.goBack();
        } else {
          // If on home page, allow exit
          if (context.mounted) {
            Navigator.of(context).maybePop();
          }
        }
      },
      child: Scaffold(
        backgroundColor: const Color(0xFFEAF4FD),
        body: SafeArea(
          bottom: false,
          child: Stack(
            children: [
              // Main Live Web Store (100% Fullscreen, NO BOTTOM BAR)
              if (!_hasError)
                WebViewWidget(controller: _controller)
              else
                _buildOfflineView(),

              // Sleek thin loading progress bar at the very top (fades away at 100%)
              if (_progress < 100 && !_hasError)
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: LinearProgressIndicator(
                    value: _progress / 100.0,
                    backgroundColor: Colors.transparent,
                    valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF2563EB)),
                    minHeight: 3,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOfflineView() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(28),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFF2563EB).withValues(alpha: 0.12),
              ),
              child: const Icon(Icons.wifi_off_rounded, size: 40, color: Color(0xFF2563EB)),
            ),
            const SizedBox(height: 20),
            Text(
              'تعذر تحميل المتجر',
              style: GoogleFonts.cairo(
                fontSize: 20,
                fontWeight: FontWeight.w900,
                color: const Color(0xFF0B1739),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'يرجى التأكد من اتصال الهاتف بالإنترنت والمحاولة مجدداً.',
              textAlign: TextAlign.center,
              style: GoogleFonts.cairo(
                fontSize: 13,
                color: const Color(0xFF64748B),
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: () {
                setState(() {
                  _hasError = false;
                  _progress = 0;
                });
                _controller.reload();
              },
              icon: const Icon(Icons.refresh_rounded, color: Colors.white),
              label: Text(
                'إعادة التحميل',
                style: GoogleFonts.cairo(fontWeight: FontWeight.w800, fontSize: 14),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF2563EB),
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
