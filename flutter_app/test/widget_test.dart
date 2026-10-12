import 'package:flutter_test/flutter_test.dart';
import 'package:ecom_speed_pro/main.dart';

void main() {
  testWidgets('EcomSpeedProApp basic smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const EcomSpeedProApp());

    // Verify that the brand or title appears
    expect(find.byType(EcomSpeedProApp), findsOneWidget);
  });
}
