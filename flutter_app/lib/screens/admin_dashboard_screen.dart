import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/order_model.dart';
import '../services/order_service.dart';
import '../theme/app_theme.dart';
import '../widgets/app_logo.dart';

class AdminDashboardScreen extends StatefulWidget {
  const AdminDashboardScreen({super.key});

  @override
  State<AdminDashboardScreen> createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends State<AdminDashboardScreen> {
  List<OrderItem> _orders = [];
  bool _isLoading = true;
  String _selectedFilter = 'all'; // 'all', 'pending', 'completed'
  String _searchQuery = '';

  @override
  void initState() {
    super.initState();
    _loadOrders();
  }

  Future<void> _loadOrders() async {
    setState(() {
      _isLoading = true;
    });

    final orders = await OrderService.fetchOrders();

    if (mounted) {
      setState(() {
        _orders = orders;
        _isLoading = false;
      });
    }
  }

  List<OrderItem> get filteredOrders {
    return _orders.where((order) {
      // Filter by status
      if (_selectedFilter == 'pending' && order.status == 'completed') {
        return false;
      }
      if (_selectedFilter == 'completed' && order.status != 'completed') {
        return false;
      }

      // Filter by search query
      if (_searchQuery.isNotEmpty) {
        final q = _searchQuery.toLowerCase();
        final matchName = order.customerName.toLowerCase().contains(q);
        final matchPhone = order.customerPhone.toLowerCase().contains(q);
        final matchId = order.id.toLowerCase().contains(q);
        final matchPlan = order.planTitle.toLowerCase().contains(q);
        return matchName || matchPhone || matchId || matchPlan;
      }

      return true;
    }).toList();
  }

  double get totalRevenue {
    return _orders.fold(0.0, (sum, item) => sum + item.price);
  }

  int get completedOrdersCount {
    return _orders.where((o) => o.status == 'completed').length;
  }

  int get pendingOrdersCount {
    return _orders.where((o) => o.status != 'completed').length;
  }

  void _showOrderDetailsBottomSheet(OrderItem order) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => _OrderDetailsSheet(
        order: order,
        onStatusUpdated: (newStatus) async {
          await OrderService.updateStatus(order.id, newStatus);
          _loadOrders();
        },
        onOrderDeleted: () async {
          await OrderService.deleteOrder(order.id);
          _loadOrders();
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgPrimary,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _loadOrders,
          color: AppTheme.neonCyan,
          backgroundColor: AppTheme.bgCardSurface,
          child: CustomScrollView(
            slivers: [
              // Top Bar
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const AppLogo(size: 38, compact: true),
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                            decoration: BoxDecoration(
                              color: AppTheme.emeraldGreen.withValues(alpha: 0.15),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(color: AppTheme.emeraldGreen.withValues(alpha: 0.4)),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  width: 8,
                                  height: 8,
                                  decoration: const BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: AppTheme.emeraldGreen,
                                  ),
                                ),
                                const SizedBox(width: 6),
                                Text(
                                  'متصل بالسيرفر',
                                  style: GoogleFonts.cairo(
                                    fontSize: 11,
                                    fontWeight: FontWeight.w700,
                                    color: AppTheme.emeraldGreen,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 8),
                          IconButton(
                            onPressed: _loadOrders,
                            icon: const Icon(Icons.refresh_rounded, color: AppTheme.neonCyan),
                            tooltip: 'تحديث البيانات',
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              // Title Header
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'لوحة التحكم الإدارية',
                        style: GoogleFonts.cairo(
                          fontSize: 22,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                        ),
                      ),
                      Text(
                        'متابعة وإدارة طلبات العملاء، المبيعات، وتفاصيل المشاريع',
                        style: GoogleFonts.cairo(
                          fontSize: 12,
                          color: AppTheme.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // 4 KPI Cards Grid
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: _KpiCard(
                              title: 'إجمالي المبيعات',
                              value: '${totalRevenue.toStringAsFixed(0)} د.م',
                              subtitle: '+34% مقارنة بالشهر السابق',
                              icon: Icons.payments_rounded,
                              color: AppTheme.emeraldGreen,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: _KpiCard(
                              title: 'الطلبات المكتملة',
                              value: '$completedOrdersCount طلب',
                              subtitle: 'تم التسليم بنجاح',
                              icon: Icons.task_alt_rounded,
                              color: AppTheme.neonCyan,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: _KpiCard(
                              title: 'في انتظار المعالجة',
                              value: '$pendingOrdersCount طلب',
                              subtitle: 'مشاريع قيد البرمجة',
                              icon: Icons.hourglass_top_rounded,
                              color: AppTheme.luxuryGold,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: _KpiCard(
                              title: 'نسبة التحويل',
                              value: '100%',
                              subtitle: 'مضاعفة المبيعات',
                              icon: Icons.auto_graph_rounded,
                              color: AppTheme.fuchsiaPink,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              // Search & Filter Bar
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Column(
                    children: [
                      TextField(
                        onChanged: (val) {
                          setState(() {
                            _searchQuery = val;
                          });
                        },
                        decoration: InputDecoration(
                          hintText: 'البحث باسم العميل، رقم الهاتف أو رقم الطلب...',
                          prefixIcon: const Icon(Icons.search_rounded, color: AppTheme.neonCyan),
                          suffixIcon: _searchQuery.isNotEmpty
                              ? IconButton(
                                  icon: const Icon(Icons.clear, color: Colors.white54),
                                  onPressed: () => setState(() => _searchQuery = ''),
                                )
                              : null,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          _buildFilterTab('all', 'جميع الطلبات (${_orders.length})'),
                          const SizedBox(width: 8),
                          _buildFilterTab('pending', 'قيد المعالجة ($pendingOrdersCount)'),
                          const SizedBox(width: 8),
                          _buildFilterTab('completed', 'المكتملة ($completedOrdersCount)'),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              // Orders List
              if (_isLoading)
                const SliverFillRemaining(
                  child: Center(
                    child: CircularProgressIndicator(color: AppTheme.neonCyan),
                  ),
                )
              else if (filteredOrders.isEmpty)
                SliverFillRemaining(
                  hasScrollBody: false,
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.inbox_rounded, size: 64, color: AppTheme.textMuted),
                        const SizedBox(height: 12),
                        Text(
                          'لا توجد طلبات مطابقة للبحث',
                          style: GoogleFonts.cairo(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                )
              else
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 8, 16, 90),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        final order = filteredOrders[index];
                        return _OrderCard(
                          order: order,
                          onTap: () => _showOrderDetailsBottomSheet(order),
                        );
                      },
                      childCount: filteredOrders.length,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFilterTab(String id, String label) {
    final isSelected = _selectedFilter == id;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() {
            _selectedFilter = id;
          });
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSelected ? AppTheme.neonCyan.withValues(alpha: 0.2) : AppTheme.bgCardSurface.withValues(alpha: 0.5),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isSelected ? AppTheme.neonCyan : Colors.white10,
              width: 1,
            ),
          ),
          child: Center(
            child: Text(
              label,
              style: GoogleFonts.cairo(
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.w900 : FontWeight.w600,
                color: isSelected ? Colors.white : AppTheme.textSecondary,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _KpiCard extends StatelessWidget {
  final String title;
  final String value;
  final String subtitle;
  final IconData icon;
  final Color color;

  const _KpiCard({
    required this.title,
    required this.value,
    required this.subtitle,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.bgCardSurface.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withValues(alpha: 0.35), width: 1.2),
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.1),
            blurRadius: 14,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: GoogleFonts.cairo(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.textSecondary,
                ),
              ),
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: color.withValues(alpha: 0.15),
                ),
                child: Icon(icon, color: color, size: 18),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            value,
            style: GoogleFonts.outfit(
              fontSize: 18,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            subtitle,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: GoogleFonts.cairo(
              fontSize: 10,
              color: color,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

class _OrderCard extends StatelessWidget {
  final OrderItem order;
  final VoidCallback onTap;

  const _OrderCard({
    required this.order,
    required this.onTap,
  });

  Color get statusColor {
    switch (order.status) {
      case 'completed':
        return AppTheme.emeraldGreen;
      case 'in_progress':
        return AppTheme.neonCyan;
      case 'new':
      default:
        return AppTheme.luxuryGold;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: AppTheme.bgCardSurface.withValues(alpha: 0.75),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white12, width: 1),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Top: Order ID & Status Pill
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.bgPrimary,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: AppTheme.neonCyan.withValues(alpha: 0.3)),
                        ),
                        child: Text(
                          order.id,
                          style: GoogleFonts.shareTechMono(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.neonCyan,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        order.paymentMethodTitle,
                        style: GoogleFonts.cairo(
                          fontSize: 11,
                          color: AppTheme.textSecondary,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: statusColor.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: statusColor.withValues(alpha: 0.4)),
                    ),
                    child: Text(
                      order.statusTitle,
                      style: GoogleFonts.cairo(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: statusColor,
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 12),

              // Customer & Plan Info
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Plan Thumbnail / Icon
                  ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Container(
                      width: 50,
                      height: 50,
                      color: AppTheme.bgPrimary,
                      child: order.productImages.isNotEmpty
                          ? Image.asset(
                              order.productImages.first,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) => const Icon(
                                Icons.image_rounded,
                                color: AppTheme.neonCyan,
                              ),
                            )
                          : const Icon(Icons.shopping_bag_outlined, color: AppTheme.neonCyan),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          order.customerName,
                          style: GoogleFonts.cairo(
                            fontSize: 14,
                            fontWeight: FontWeight.w900,
                            color: Colors.white,
                          ),
                        ),
                        Text(
                          order.planTitle,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: GoogleFonts.cairo(
                            fontSize: 12,
                            color: AppTheme.textSecondary,
                          ),
                        ),
                        Text(
                          order.customerPhone,
                          style: GoogleFonts.shareTechMono(
                            fontSize: 11,
                            color: AppTheme.neonCyan,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        order.formattedPrice,
                        style: GoogleFonts.cairo(
                          fontSize: 15,
                          fontWeight: FontWeight.w900,
                          color: AppTheme.luxuryGold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Text(
                            'التفاصيل',
                            style: GoogleFonts.cairo(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: AppTheme.neonCyan,
                            ),
                          ),
                          const Icon(Icons.arrow_forward_ios_rounded, size: 10, color: AppTheme.neonCyan),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _OrderDetailsSheet extends StatefulWidget {
  final OrderItem order;
  final Function(String) onStatusUpdated;
  final VoidCallback onOrderDeleted;

  const _OrderDetailsSheet({
    required this.order,
    required this.onStatusUpdated,
    required this.onOrderDeleted,
  });

  @override
  State<_OrderDetailsSheet> createState() => _OrderDetailsSheetState();
}

class _OrderDetailsSheetState extends State<_OrderDetailsSheet> {
  late TextEditingController _deliveredUrlController;
  bool _isSavingUrl = false;

  @override
  void initState() {
    super.initState();
    _deliveredUrlController = TextEditingController(text: widget.order.deliveredUrl ?? '');
  }

  @override
  void dispose() {
    _deliveredUrlController.dispose();
    super.dispose();
  }

  Future<void> _saveDeliveredUrl() async {
    setState(() => _isSavingUrl = true);
    final url = _deliveredUrlController.text.trim();
    await OrderService.updateDeliveredUrl(widget.order.id, url);
    setState(() {
      _isSavingUrl = false;
      widget.order.deliveredUrl = url;
    });
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('تم حفظ وتحديث رابط المتجر المسلّم بنجاح 💾'),
        backgroundColor: AppTheme.emeraldGreen,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final order = widget.order;
    final isCompleted = order.status == 'completed' || order.status == 'paid';
    final isInProgress = order.status == 'in_progress';

    final trackingUrl = 'https://ecom-speed-pro.vercel.app/order/${order.id}';

    return Container(
      decoration: const BoxDecoration(
        color: AppTheme.bgCardSurface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      padding: const EdgeInsets.all(20),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Handle Bar
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Top Header: Title & ID
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.store_rounded, color: AppTheme.neonCyan, size: 22),
                    const SizedBox(width: 8),
                    Text(
                      order.storeName.isNotEmpty ? order.storeName : 'طلب متجر جديد',
                      style: GoogleFonts.cairo(
                        fontSize: 18,
                        fontWeight: FontWeight.w900,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: (isCompleted ? AppTheme.emeraldGreen : isInProgress ? AppTheme.neonCyan : Colors.amber).withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: isCompleted ? AppTheme.emeraldGreen : isInProgress ? AppTheme.neonCyan : Colors.amber,
                    ),
                  ),
                  child: Text(
                    order.statusTitle,
                    style: GoogleFonts.cairo(
                      fontSize: 11,
                      fontWeight: FontWeight.w800,
                      color: isCompleted ? AppTheme.emeraldGreen : isInProgress ? AppTheme.neonCyan : Colors.amber,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              'رقم الطلب: ${order.id} • ${order.planTitle} (${order.formattedPrice})',
              style: GoogleFonts.cairo(
                fontSize: 12,
                color: AppTheme.textSecondary,
              ),
            ),
            const SizedBox(height: 16),

            // ==========================================
            // 👤 القسم 1: قسم معلومات التاجر
            // ==========================================
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.bgPrimary.withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.neonCyan.withValues(alpha: 0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.person_rounded, color: AppTheme.neonCyan, size: 18),
                      const SizedBox(width: 6),
                      Text(
                        'القسم الأول: معلومات وبيانات التاجر',
                        style: GoogleFonts.cairo(
                          fontSize: 13,
                          fontWeight: FontWeight.w900,
                          color: AppTheme.neonCyan,
                        ),
                      ),
                    ],
                  ),
                  const Divider(color: Colors.white10, height: 16),
                  _infoRow('الاسم الكامل:', order.customerName),
                  _infoRow('البريد الإلكتروني:', order.customerEmail.isNotEmpty ? order.customerEmail : 'غير محدد'),
                  _infoRow('الواتساب / الهاتف:', order.customerPhone),
                  _infoRow('المدينة بالمغرب:', order.customerCity),
                  const SizedBox(height: 10),

                  // Quick Merchant Contact Buttons
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () async {
                            final cleanPhone = order.customerPhone.replaceAll(RegExp(r'[^0-9]'), '');
                            final waPhone = cleanPhone.startsWith('212') ? cleanPhone : '212${cleanPhone.replaceFirst(RegExp(r'^0'), '')}';
                            final waUrl = Uri.parse(
                              'https://wa.me/$waPhone?text=${Uri.encodeComponent('السلام عليكم أخي ${order.customerName}، نتواصل معك من إدارة Ecom Speed Pro.')}',
                            );
                            if (await canLaunchUrl(waUrl)) {
                              await launchUrl(waUrl, mode: LaunchMode.externalApplication);
                            }
                          },
                          icon: const Icon(Icons.chat_bubble_rounded, size: 15, color: Colors.white),
                          label: Text(
                            'مراسلة واتساب',
                            style: GoogleFonts.cairo(
                              fontWeight: FontWeight.w800,
                              fontSize: 11,
                              color: Colors.white,
                            ),
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF25D366),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            padding: const EdgeInsets.symmetric(vertical: 8),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () async {
                            final telUrl = Uri.parse('tel:${order.customerPhone}');
                            if (await canLaunchUrl(telUrl)) {
                              await launchUrl(telUrl);
                            }
                          },
                          icon: const Icon(Icons.phone_rounded, size: 15, color: AppTheme.neonCyan),
                          label: Text(
                            'اتصال بالتاجر',
                            style: GoogleFonts.cairo(
                              fontWeight: FontWeight.w800,
                              fontSize: 11,
                              color: AppTheme.neonCyan,
                            ),
                          ),
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: AppTheme.neonCyan),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            padding: const EdgeInsets.symmetric(vertical: 8),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // ==========================================
            // 🛍️ القسم 2: قسم معلومات ومواصفات المنتج
            // ==========================================
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.bgPrimary.withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.emeraldGreen.withValues(alpha: 0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.shopping_bag_rounded, color: AppTheme.emeraldGreen, size: 18),
                      const SizedBox(width: 6),
                      Text(
                        'القسم الثاني: معلومات ومواصفات المنتج',
                        style: GoogleFonts.cairo(
                          fontSize: 13,
                          fontWeight: FontWeight.w900,
                          color: AppTheme.emeraldGreen,
                        ),
                      ),
                    ],
                  ),
                  const Divider(color: Colors.white10, height: 16),
                  _infoRow('اسم المتجر / المنتج:', order.storeName.isNotEmpty ? order.storeName : 'متجر قيد التسمية'),
                  _infoRow('ثمن بيع المنتج:', order.productPrice.isNotEmpty ? order.productPrice : 'غير محدد'),
                  _infoRow('رقم استقبال الطلبيات:', order.orderPhone.isNotEmpty ? order.orderPhone : order.customerPhone),
                  if (order.productNotes.isNotEmpty)
                    _infoRow('ملاحظات التجهيز:', order.productNotes),
                  const SizedBox(height: 10),

                  // Order Reception WhatsApp Test
                  if (order.orderPhone.isNotEmpty || order.customerPhone.isNotEmpty)
                    SizedBox(
                      width: double.infinity,
                      child: OutlinedButton.icon(
                        onPressed: () async {
                          final p = (order.orderPhone.isNotEmpty ? order.orderPhone : order.customerPhone).replaceAll(RegExp(r'[^0-9]'), '');
                          final wa = p.startsWith('212') ? p : '212${p.replaceFirst(RegExp(r'^0'), '')}';
                          final waUrl = Uri.parse(
                            'https://wa.me/$wa?text=${Uri.encodeComponent('السلام عليكم، هذا اختبار رقم استقبال طلبات ومبيعات متجر (${order.storeName.isNotEmpty ? order.storeName : order.planTitle}).')}',
                          );
                          if (await canLaunchUrl(waUrl)) {
                            await launchUrl(waUrl, mode: LaunchMode.externalApplication);
                          }
                        },
                        icon: const Icon(Icons.send_rounded, size: 14, color: AppTheme.emeraldGreen),
                        label: Text(
                          'اختبار رقم استقبال مبيعات المتجر عبر واتساب',
                          style: GoogleFonts.cairo(
                            fontWeight: FontWeight.w800,
                            fontSize: 11,
                            color: AppTheme.emeraldGreen,
                          ),
                        ),
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: AppTheme.emeraldGreen),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                      ),
                    ),

                  const SizedBox(height: 12),

                  // Product Images Gallery
                  Text(
                    'صور المنتج المرفقة (${order.productImages.length}):',
                    style: GoogleFonts.cairo(
                      fontSize: 12,
                      fontWeight: FontWeight.w800,
                      color: Colors.white70,
                    ),
                  ),
                  const SizedBox(height: 8),
                  if (order.productImages.isEmpty)
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.black26,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        'لم يتم إرفاق صور للمنتج بعد',
                        style: GoogleFonts.cairo(fontSize: 11, color: Colors.white38),
                      ),
                    )
                  else
                    SizedBox(
                      height: 90,
                      child: ListView.separated(
                        scrollDirection: Axis.horizontal,
                        itemCount: order.productImages.length,
                        separatorBuilder: (context, index) => const SizedBox(width: 8),
                        itemBuilder: (context, index) {
                          final img = order.productImages[index];
                          return ClipRRect(
                            borderRadius: BorderRadius.circular(12),
                            child: Container(
                              width: 90,
                              height: 90,
                              color: Colors.black45,
                              child: img.startsWith('assets/')
                                  ? Image.asset(img, fit: BoxFit.cover)
                                  : (img.startsWith('http')
                                      ? Image.network(img, fit: BoxFit.cover)
                                      : Image.asset(
                                          'assets/images/card_standard_new.webp',
                                          fit: BoxFit.cover,
                                        )),
                            ),
                          );
                        },
                      ),
                    ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // ==========================================
            // 🌐 خانة 'رابط المتجر النهائي' (Delivered Store URL)
            // ==========================================
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.bgPrimary.withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'رابط المتجر النهائي المسلّم للعميل:',
                    style: GoogleFonts.cairo(
                      fontSize: 13,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _deliveredUrlController,
                          style: GoogleFonts.shareTechMono(color: Colors.white, fontSize: 12),
                          decoration: InputDecoration(
                            hintText: 'مثال: https://mon-magasin-maroc.com',
                            hintStyle: GoogleFonts.cairo(color: Colors.white30, fontSize: 11),
                            prefixIcon: const Icon(Icons.language_rounded, color: AppTheme.neonCyan, size: 18),
                            filled: true,
                            fillColor: Colors.black26,
                            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide.none,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton.icon(
                        onPressed: _isSavingUrl ? null : _saveDeliveredUrl,
                        icon: _isSavingUrl
                            ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                            : const Icon(Icons.save_rounded, size: 16, color: Colors.white),
                        label: Text(
                          'حفظ',
                          style: GoogleFonts.cairo(fontWeight: FontWeight.w800, fontSize: 12, color: Colors.white),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.neonCyan,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                        ),
                      ),
                    ],
                  ),
                  if (_deliveredUrlController.text.trim().isNotEmpty) ...[
                    const SizedBox(height: 8),
                    TextButton.icon(
                      onPressed: () async {
                        final u = Uri.parse(_deliveredUrlController.text.trim());
                        if (await canLaunchUrl(u)) {
                          await launchUrl(u, mode: LaunchMode.externalApplication);
                        }
                      },
                      icon: const Icon(Icons.open_in_browser_rounded, size: 16, color: AppTheme.neonCyan),
                      label: Text(
                        'زيارة متجر العميل مباشرة ↗',
                        style: GoogleFonts.cairo(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.neonCyan,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),

            const SizedBox(height: 16),

            // ==========================================
            // ✅ زر تغيير الحالة إلى 'مكتمل'
            // ==========================================
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AppTheme.emeraldGreen.withValues(alpha: 0.2),
                    Colors.teal.withValues(alpha: 0.1),
                  ],
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.emeraldGreen.withValues(alpha: 0.5)),
              ),
              child: Column(
                children: [
                  ElevatedButton.icon(
                    onPressed: () {
                      widget.onStatusUpdated('completed');
                      Navigator.pop(context);
                    },
                    icon: const Icon(Icons.check_circle_rounded, size: 20, color: Colors.black),
                    label: Text(
                      isCompleted ? '✅ الطلب مكتمل ومسلّم للتاجر' : 'تغيير الحالة إلى مكتمل 🟢 (تحديث صفحة التتبع)',
                      style: GoogleFonts.cairo(
                        fontSize: 13,
                        fontWeight: FontWeight.w900,
                        color: Colors.black,
                      ),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.emeraldGreen,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      minimumSize: const Size(double.infinity, 48),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'يقوم هذا الزر بتحديث السيرفر وصفحة التتبع السرية للتاجر فورياً لتصبح "مكتمل"',
                    textAlign: TextAlign.center,
                    style: GoogleFonts.cairo(fontSize: 10.5, color: Colors.white60),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Status Selector Cards (new, in_progress, completed)
            Text(
              'خيارات الحالة الأخرى:',
              style: GoogleFonts.cairo(
                fontSize: 12,
                fontWeight: FontWeight.w800,
                color: Colors.white70,
              ),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                _statusBtn('new', 'قيد المراجعة 🟡', Colors.amber, context),
                const SizedBox(width: 8),
                _statusBtn('in_progress', 'جاري التجهيز 🔵', AppTheme.neonCyan, context),
                const SizedBox(width: 8),
                _statusBtn('completed', 'مكتمل 🟢', AppTheme.emeraldGreen, context),
              ],
            ),

            const SizedBox(height: 16),

            // Secret UUID Tracking Link Box
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.black38,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: Colors.white10),
              ),
              child: Row(
                children: [
                  const Icon(Icons.lock_rounded, color: AppTheme.neonCyan, size: 16),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      trackingUrl,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: GoogleFonts.shareTechMono(color: Colors.white70, fontSize: 11),
                    ),
                  ),
                  TextButton(
                    onPressed: () async {
                      final u = Uri.parse(trackingUrl);
                      if (await canLaunchUrl(u)) {
                        await launchUrl(u, mode: LaunchMode.externalApplication);
                      }
                    },
                    child: Text(
                      'فتح ↗',
                      style: GoogleFonts.cairo(color: AppTheme.neonCyan, fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Delete Order
            OutlinedButton.icon(
              onPressed: () {
                widget.onOrderDeleted();
                Navigator.pop(context);
              },
              icon: const Icon(Icons.delete_outline_rounded, color: Colors.redAccent, size: 18),
              label: Text(
                'حذف هذا الطلب نهائياً',
                style: GoogleFonts.cairo(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: Colors.redAccent,
                ),
              ),
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: Colors.redAccent),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _infoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 110,
            child: Text(
              label,
              style: GoogleFonts.cairo(fontSize: 11, color: AppTheme.textSecondary, fontWeight: FontWeight.w700),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: GoogleFonts.cairo(fontSize: 11.5, fontWeight: FontWeight.w800, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  Widget _statusBtn(String statusId, String label, Color color, BuildContext context) {
    final isCurrent = widget.order.status == statusId;
    return Expanded(
      child: ElevatedButton(
        onPressed: isCurrent
            ? null
            : () {
                widget.onStatusUpdated(statusId);
                Navigator.pop(context);
              },
        style: ElevatedButton.styleFrom(
          backgroundColor: isCurrent ? color : color.withValues(alpha: 0.15),
          foregroundColor: isCurrent ? Colors.black : color,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: color.withValues(alpha: 0.5)),
          ),
          padding: const EdgeInsets.symmetric(vertical: 8),
        ),
        child: Text(
          label,
          style: GoogleFonts.cairo(
            fontSize: 10,
            fontWeight: FontWeight.w800,
          ),
        ),
      ),
    );
  }
}

