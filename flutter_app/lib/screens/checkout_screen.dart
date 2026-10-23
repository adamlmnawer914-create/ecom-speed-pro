import 'dart:math';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/order_model.dart';
import '../models/package_model.dart';
import '../services/order_service.dart';
import '../theme/app_theme.dart';

class CheckoutScreen extends StatefulWidget {
  final PricingPackage selectedPackage;

  const CheckoutScreen({
    super.key,
    required this.selectedPackage,
  });

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final _stage1FormKey = GlobalKey<FormState>();
  final _stage2FormKey = GlobalKey<FormState>();

  int _currentStep = 1; // 1: بيانات التاجر, 2: معلومات المنتج والدفع (PayPal • Visa • Mastercard)

  // Stage 1: Customer / Merchant Info Controllers
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _emailController = TextEditingController();
  final _cityController = TextEditingController(text: 'الدار البيضاء');

  // Stage 2: Product & Sales Info Controllers
  final _storeNameController = TextEditingController();
  final _productPriceController = TextEditingController();
  final _orderPhoneController = TextEditingController();
  final _notesController = TextEditingController();

  // Payment Form Controllers
  final _cardNumberController = TextEditingController();
  final _cardHolderController = TextEditingController();
  final _expiryController = TextEditingController();
  final _cvvController = TextEditingController();

  final List<String> _uploadedImages = [];
  bool _isSubmitting = false;

  final ImagePicker _picker = ImagePicker();

  final List<String> _moroccanCities = [
    'الدار البيضاء',
    'الرباط',
    'مراكش',
    'طنجة',
    'فاس',
    'أكادير',
    'مكناس',
    'وجدة',
    'القنيطرة',
    'تطوان',
    'تمارة',
    'سلا',
    'الجديدة',
    'المحمدية',
    'الناظور',
    'بني ملال',
    'العيون',
    'الداخلة',
  ];

  @override
  void initState() {
    super.initState();
    _uploadedImages.add(widget.selectedPackage.imagePath);
  }

  @override
  void dispose() {
    _nameController.dispose();
    _phoneController.dispose();
    _emailController.dispose();
    _cityController.dispose();
    _storeNameController.dispose();
    _productPriceController.dispose();
    _orderPhoneController.dispose();
    _notesController.dispose();
    _cardNumberController.dispose();
    _cardHolderController.dispose();
    _expiryController.dispose();
    _cvvController.dispose();
    super.dispose();
  }

  Future<void> _pickImage() async {
    try {
      final XFile? image = await _picker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 1200,
        imageQuality: 85,
      );
      if (image != null) {
        setState(() {
          _uploadedImages.add(image.path);
        });
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('تعذر اختيار الصورة من الجهاز')),
      );
    }
  }

  void _proceedToStage2() {
    if (!_stage1FormKey.currentState!.validate()) {
      return;
    }

    if (_orderPhoneController.text.trim().isEmpty) {
      _orderPhoneController.text = _phoneController.text.trim();
    }
    if (_cardHolderController.text.trim().isEmpty) {
      _cardHolderController.text = _nameController.text.trim().toUpperCase();
    }

    setState(() {
      _currentStep = 2;
    });
  }

  Future<void> _processOrder() async {
    if (!_stage2FormKey.currentState!.validate()) {
      return;
    }

    setState(() {
      _isSubmitting = true;
    });

    final orderId = 'ESP-${Random().nextInt(900000) + 100000}';
    final newOrder = OrderItem(
      id: orderId,
      customerName: _nameController.text.trim(),
      customerCity: _cityController.text.trim(),
      customerPhone: _phoneController.text.trim(),
      customerEmail: _emailController.text.trim(),
      storeName: _storeNameController.text.trim().isNotEmpty
          ? _storeNameController.text.trim()
          : 'متجر ${_nameController.text.trim()}',
      productPrice: _productPriceController.text.trim().isNotEmpty
          ? _productPriceController.text.trim()
          : 'غير محدد',
      orderPhone: _orderPhoneController.text.trim().isNotEmpty
          ? _orderPhoneController.text.trim()
          : _phoneController.text.trim(),
      planTitle: widget.selectedPackage.name,
      price: widget.selectedPackage.numericPrice,
      formattedPrice: widget.selectedPackage.price,
      paymentMethod: 'PayPal',
      productImages: List.from(_uploadedImages),
      productNotes: _notesController.text.trim(),
      status: 'new',
      createdAt: DateTime.now().toIso8601String(),
    );

    await OrderService.submitOrder(newOrder);

    setState(() {
      _isSubmitting = false;
    });

    if (!mounted) return;

    _showOrderConfirmationDialog(newOrder);
  }

  void _showOrderConfirmationDialog(OrderItem order) {
    final trackingUrl = 'https://ecom-speed-pro.vercel.app/order/${order.id}';

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppTheme.bgCardSurface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(28),
          side: const BorderSide(color: AppTheme.neonCyan, width: 2),
        ),
        title: Column(
          children: [
            Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: AppTheme.primaryButtonGradient,
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.neonCyan.withValues(alpha: 0.5),
                    blurRadius: 20,
                  ),
                ],
              ),
              child: const Icon(Icons.check_rounded, color: Colors.white, size: 38),
            ),
            const SizedBox(height: 16),
            Text(
              'تم تأكيد الطلب بنجاح!',
              textAlign: TextAlign.center,
              style: GoogleFonts.cairo(
                fontWeight: FontWeight.w900,
                fontSize: 18,
                color: Colors.white,
              ),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppTheme.bgPrimary.withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white12),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'رقم الطلب الرسمي:',
                        style: GoogleFonts.cairo(
                          fontSize: 12,
                          color: AppTheme.textSecondary,
                        ),
                      ),
                      Text(
                        order.id,
                        style: GoogleFonts.shareTechMono(
                          fontWeight: FontWeight.w700,
                          fontSize: 14,
                          color: AppTheme.neonCyan,
                        ),
                      ),
                    ],
                  ),
                  const Divider(color: Colors.white10, height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'التاجر:',
                        style: GoogleFonts.cairo(fontSize: 12, color: AppTheme.textSecondary),
                      ),
                      Text(
                        '${order.customerName} (${order.customerCity})',
                        style: GoogleFonts.cairo(fontWeight: FontWeight.w800, fontSize: 12, color: Colors.white),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'المبلغ المؤدى:',
                        style: GoogleFonts.cairo(fontSize: 12, color: AppTheme.textSecondary),
                      ),
                      Text(
                        order.formattedPrice,
                        style: GoogleFonts.cairo(
                          fontWeight: FontWeight.w900,
                          fontSize: 14,
                          color: AppTheme.emeraldGreen,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // Secret UUID Link Capsule
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.bgPrimary,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppTheme.neonCyan.withValues(alpha: 0.4)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.lock_rounded, color: AppTheme.neonCyan, size: 16),
                      const SizedBox(width: 6),
                      Text(
                        'رابطك السري المخصص لمتابعة متجرك (UUID):',
                        style: GoogleFonts.cairo(fontSize: 11, fontWeight: FontWeight.w800, color: AppTheme.neonCyan),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    trackingUrl,
                    style: GoogleFonts.shareTechMono(fontSize: 11, color: Colors.white70),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          ElevatedButton.icon(
            onPressed: () async {
              final u = Uri.parse(trackingUrl);
              if (await canLaunchUrl(u)) {
                await launchUrl(u, mode: LaunchMode.externalApplication);
              }
            },
            icon: const Icon(Icons.rocket_launch_rounded, size: 16, color: Colors.black),
            label: Text(
              'متابعة وتتبع حالة متجرك الآن 🚀',
              style: GoogleFonts.cairo(
                fontWeight: FontWeight.w900,
                fontSize: 13,
                color: Colors.black,
              ),
            ),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.neonCyan,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              minimumSize: const Size(double.infinity, 44),
            ),
          ),
          const SizedBox(height: 8),
          Center(
            child: TextButton(
              onPressed: () {
                Navigator.pop(ctx);
                Navigator.pop(context);
              },
              child: Text(
                'العودة إلى المتجر',
                style: GoogleFonts.cairo(
                  fontWeight: FontWeight.w700,
                  fontSize: 12,
                  color: AppTheme.textSecondary,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgPrimary,
      appBar: AppBar(
        title: Text(
          'بوابات الدفع: PayPal • Visa • Mastercard 💳',
          style: GoogleFonts.cairo(
            fontWeight: FontWeight.w900,
            fontSize: 16,
            color: Colors.white,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_rounded, color: AppTheme.neonCyan),
          onPressed: () {
            if (_currentStep == 2) {
              setState(() => _currentStep = 1);
            } else {
              Navigator.pop(context);
            }
          },
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Package Summary Banner
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: AppTheme.bgCardSurface.withValues(alpha: 0.8),
                  border: Border.all(
                    color: widget.selectedPackage.accentColor.withValues(alpha: 0.4),
                    width: 1.5,
                  ),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 52,
                      height: 52,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(14),
                        color: widget.selectedPackage.accentColor.withValues(alpha: 0.15),
                      ),
                      child: Icon(
                        widget.selectedPackage.badgeIcon,
                        color: widget.selectedPackage.accentColor,
                        size: 28,
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.selectedPackage.name,
                            style: GoogleFonts.cairo(
                              fontWeight: FontWeight.w900,
                              fontSize: 14,
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            widget.selectedPackage.subtitle,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: GoogleFonts.cairo(
                              fontSize: 11,
                              color: AppTheme.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: widget.selectedPackage.buttonGradient,
                        ),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        widget.selectedPackage.price,
                        style: GoogleFonts.cairo(
                          fontWeight: FontWeight.w900,
                          fontSize: 13,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              // 🌟 2-STEP STEPPER BAR
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: AppTheme.bgCardSurface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white12),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: GestureDetector(
                        onTap: () => setState(() => _currentStep = 1),
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          decoration: BoxDecoration(
                            color: _currentStep == 1
                                ? AppTheme.neonCyan.withValues(alpha: 0.25)
                                : Colors.transparent,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: _currentStep == 1 ? AppTheme.neonCyan : Colors.transparent,
                            ),
                          ),
                          child: Center(
                            child: Text(
                              '1. بيانات التاجر 👤',
                              style: GoogleFonts.cairo(
                                fontSize: 12,
                                fontWeight: FontWeight.w900,
                                color: _currentStep == 1 ? Colors.white : AppTheme.textMuted,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 6),
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          if (_nameController.text.trim().isNotEmpty && _phoneController.text.trim().isNotEmpty) {
                            setState(() => _currentStep = 2);
                          }
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          decoration: BoxDecoration(
                            color: _currentStep == 2
                                ? AppTheme.neonCyan.withValues(alpha: 0.25)
                                : Colors.transparent,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: _currentStep == 2 ? AppTheme.neonCyan : Colors.transparent,
                            ),
                          ),
                          child: Center(
                            child: Text(
                              '2. مواصفات المنتج والدفع 🛍️',
                              style: GoogleFonts.cairo(
                                fontSize: 12,
                                fontWeight: FontWeight.w900,
                                color: _currentStep == 2 ? Colors.white : AppTheme.textMuted,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 18),

              // ==========================================
              // STEP 1: بيانات التاجر (الاسم، الإيميل، الواتساب، المدينة)
              // ==========================================
              if (_currentStep == 1) ...[
                Form(
                  key: _stage1FormKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text(
                        'المرحلة الأولى: معلومات وبيانات التاجر الأساسية',
                        style: GoogleFonts.cairo(
                          fontWeight: FontWeight.w800,
                          fontSize: 13,
                          color: AppTheme.neonCyan,
                        ),
                      ),
                      const SizedBox(height: 12),

                      TextFormField(
                        controller: _nameController,
                        decoration: const InputDecoration(
                          labelText: 'الاسم الكامل للتاجر *',
                          hintText: 'مثال: يوسف الإدريسي',
                          prefixIcon: Icon(Icons.person_rounded, color: AppTheme.neonCyan),
                        ),
                        validator: (val) {
                          if (val == null || val.trim().isEmpty) return 'الاسم الكامل مطلوب';
                          return null;
                        },
                      ),
                      const SizedBox(height: 12),

                      TextFormField(
                        controller: _emailController,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(
                          labelText: 'البريد الإلكتروني للتاجر *',
                          hintText: 'merchant@gmail.com',
                          prefixIcon: Icon(Icons.email_outlined, color: AppTheme.neonCyan),
                        ),
                        validator: (val) {
                          if (val == null || !val.contains('@')) return 'يرجى إدخال بريد إلكتروني صحيح';
                          return null;
                        },
                      ),
                      const SizedBox(height: 12),

                      TextFormField(
                        controller: _phoneController,
                        keyboardType: TextInputType.phone,
                        decoration: const InputDecoration(
                          labelText: 'رقم الواتساب / الهاتف الشخصي *',
                          hintText: '+212 6 XX XX XX XX',
                          prefixIcon: Icon(Icons.phone_android_rounded, color: AppTheme.emeraldGreen),
                        ),
                        validator: (val) {
                          if (val == null || val.trim().isEmpty) return 'رقم الهاتف مطلوب للتواصل';
                          return null;
                        },
                      ),
                      const SizedBox(height: 12),

                      DropdownButtonFormField<String>(
                        initialValue: _moroccanCities.contains(_cityController.text) ? _cityController.text : _moroccanCities.first,
                        decoration: const InputDecoration(
                          labelText: 'المدينة بالمغرب *',
                          prefixIcon: Icon(Icons.location_on_rounded, color: AppTheme.luxuryGold),
                        ),
                        items: _moroccanCities.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                        onChanged: (val) {
                          if (val != null) {
                            setState(() => _cityController.text = val);
                          }
                        },
                      ),
                      const SizedBox(height: 24),

                      // Next Step Button
                      ElevatedButton.icon(
                        onPressed: _proceedToStage2,
                        icon: const Icon(Icons.arrow_back_rounded, color: Colors.black),
                        label: Text(
                          'المتابعة لمعلومات المنتج والدفع (الخطوة 2 من 2) ←',
                          style: GoogleFonts.cairo(
                            fontWeight: FontWeight.w900,
                            fontSize: 14,
                            color: Colors.black,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.neonCyan,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          padding: const EdgeInsets.symmetric(vertical: 14),
                        ),
                      ),
                    ],
                  ),
                ),
              ],

              // ==========================================
              // STEP 2: معلومات المنتج والدفع عبر PayPal • Visa • Mastercard
              // ==========================================
              if (_currentStep == 2) ...[
                Form(
                  key: _stage2FormKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'المرحلة الثانية: مواصفات المنتج وبوابة الدفع الآمنة',
                            style: GoogleFonts.cairo(
                              fontWeight: FontWeight.w800,
                              fontSize: 13,
                              color: AppTheme.emeraldGreen,
                            ),
                          ),
                          TextButton(
                            onPressed: () => setState(() => _currentStep = 1),
                            child: Text(
                              '← تعديل بيانات التاجر',
                              style: GoogleFonts.cairo(color: AppTheme.neonCyan, fontSize: 11),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),

                      TextFormField(
                        controller: _storeNameController,
                        decoration: const InputDecoration(
                          labelText: 'اسم المتجر أو المنتج',
                          hintText: 'مثال: متجر الساعات الفاخرة',
                          prefixIcon: Icon(Icons.storefront_rounded, color: AppTheme.neonCyan),
                        ),
                      ),
                      const SizedBox(height: 12),

                      TextFormField(
                        controller: _productPriceController,
                        decoration: const InputDecoration(
                          labelText: 'ثمن بيع المنتج للزبائن بالدرهم *',
                          hintText: 'مثال: 299 درهم أو 349 MAD',
                          prefixIcon: Icon(Icons.tag_rounded, color: AppTheme.emeraldGreen),
                        ),
                        validator: (val) {
                          if (val == null || val.trim().isEmpty) return 'يرجى تحديد ثمن بيع المنتج في متجرك';
                          return null;
                        },
                      ),
                      const SizedBox(height: 12),

                      TextFormField(
                        controller: _orderPhoneController,
                        keyboardType: TextInputType.phone,
                        decoration: const InputDecoration(
                          labelText: 'رقم الهاتف لاستقبال المبيعات والطلبيات *',
                          hintText: '+212 6 XX XX XX XX',
                          prefixIcon: Icon(Icons.phone_in_talk_rounded, color: AppTheme.neonCyan),
                        ),
                        validator: (val) {
                          if (val == null || val.trim().isEmpty) return 'رقم استقبال المبيعات مطلوب';
                          return null;
                        },
                      ),
                      const SizedBox(height: 12),

                      TextFormField(
                        controller: _notesController,
                        maxLines: 2,
                        decoration: const InputDecoration(
                          labelText: 'ملاحظات أو متطلبات خاصة بالمتجر (اختياري)',
                          prefixIcon: Icon(Icons.note_alt_outlined, color: AppTheme.neonCyan),
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Product Images Upload Box
                      Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: AppTheme.bgCardSurface.withValues(alpha: 0.6),
                          borderRadius: BorderRadius.circular(18),
                          border: Border.all(color: Colors.white12),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'صور المنتج المرفقة (${_uploadedImages.length})',
                                  style: GoogleFonts.cairo(fontWeight: FontWeight.w800, fontSize: 12, color: Colors.white),
                                ),
                                TextButton.icon(
                                  onPressed: _pickImage,
                                  icon: const Icon(Icons.add_photo_alternate_rounded, size: 16, color: AppTheme.neonCyan),
                                  label: Text('إضافة صورة', style: GoogleFonts.cairo(fontSize: 11, color: AppTheme.neonCyan)),
                                ),
                              ],
                            ),
                            if (_uploadedImages.isNotEmpty) ...[
                              const SizedBox(height: 8),
                              SizedBox(
                                height: 75,
                                child: ListView.separated(
                                  scrollDirection: Axis.horizontal,
                                  itemCount: _uploadedImages.length,
                                  separatorBuilder: (context, index) => const SizedBox(width: 8),
                                  itemBuilder: (context, index) {
                                    final img = _uploadedImages[index];
                                    return Stack(
                                      children: [
                                        ClipRRect(
                                          borderRadius: BorderRadius.circular(10),
                                          child: Container(
                                            width: 75,
                                            height: 75,
                                            color: Colors.black26,
                                            child: img.startsWith('assets/')
                                                ? Image.asset(img, fit: BoxFit.cover)
                                                : Image.asset(widget.selectedPackage.imagePath, fit: BoxFit.cover),
                                          ),
                                        ),
                                        Positioned(
                                          top: 2,
                                          right: 2,
                                          child: GestureDetector(
                                            onTap: () => setState(() => _uploadedImages.removeAt(index)),
                                            child: Container(
                                              padding: const EdgeInsets.all(2),
                                              decoration: const BoxDecoration(shape: BoxShape.circle, color: Colors.redAccent),
                                              child: const Icon(Icons.close, size: 12, color: Colors.white),
                                            ),
                                          ),
                                        ),
                                      ],
                                    );
                                  },
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),

                      const SizedBox(height: 18),

                      // PayPal & Card Gateways Badge Banner
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppTheme.bgCardSurface,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: AppTheme.neonCyan.withValues(alpha: 0.3)),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                const Icon(Icons.verified_rounded, color: AppTheme.emeraldGreen, size: 20),
                                const SizedBox(width: 8),
                                Text(
                                  'بوابات الدفع المعتمدة 💳',
                                  style: GoogleFonts.cairo(fontWeight: FontWeight.w900, fontSize: 13, color: Colors.white),
                                ),
                              ],
                            ),
                            Text(
                              'PayPal • VISA • MC',
                              style: GoogleFonts.shareTechMono(color: AppTheme.neonCyan, fontSize: 11, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 18),

                      // Submit & Pay Button
                      ElevatedButton.icon(
                        onPressed: _isSubmitting ? null : _processOrder,
                        icon: _isSubmitting
                            ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.black))
                            : const Icon(Icons.lock_rounded, color: Colors.black),
                        label: Text(
                          _isSubmitting
                              ? 'جاري المعالجة...'
                              : 'تأكيد الطلب والدفع الآمن (${widget.selectedPackage.price})',
                          style: GoogleFonts.cairo(
                            fontWeight: FontWeight.w900,
                            fontSize: 14,
                            color: Colors.black,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.emeraldGreen,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          elevation: 6,
                        ),
                      ),
                    ],
                  ),
                ),
              ],

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}
