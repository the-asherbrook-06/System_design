// packages
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';

// pages
import 'pages/welcome_page.dart';
import 'pages/login_page.dart';
import 'pages/signup_page.dart';
import 'pages/chats_page.dart';
import 'pages/groups_page.dart';
import 'pages/channel_page.dart';
import 'pages/filter_page.dart';
import 'pages/chat_page.dart';
import 'pages/profile_page.dart';
import 'pages/edit_profile.dart';
import 'pages/chat_info.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Link',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const WelcomePage(),
        '/login': (context) => const LoginPage(),
        '/signup': (context) => const SignupPage(),
        '/chats': (context) => const ChatsPage(),
        '/groups': (context) => const GroupsPage(),
        '/channels': (context) => const ChannelPage(),
        '/filter': (context) => const FilterPage(),
        '/chat': (context) => const ChatPage(),
        '/profile': (context) => const ProfilePage(),
        '/edit_profile': (context) => const EditProfilePage(),
        '/chat_info': (context) => const ChatInfoPage(),
      },
    );
  }
}