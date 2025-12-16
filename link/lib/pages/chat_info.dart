import 'package:flutter/material.dart';

class ChatInfoPage extends StatelessWidget {
  const ChatInfoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Chat Info')),
      body: const Center(child: Text('Chat Info Page')),
    );
  }
}