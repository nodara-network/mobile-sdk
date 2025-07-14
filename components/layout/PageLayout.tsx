import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from './PageHeader';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  subtitle?: string;
  showHeader?: boolean;
  scrollable?: boolean;
}

export default function PageLayout({ 
  children, 
  title, 
  description, 
  subtitle, 
  showHeader = true,
  scrollable = true
}: PageLayoutProps) {
  const ContentWrapper = scrollable ? ScrollView : View;
  
  return (
    <SafeAreaView style={styles.container}>
      <ContentWrapper 
        style={scrollable ? styles.scrollView : styles.view}
        contentContainerStyle={scrollable ? styles.scrollContent : undefined}
        showsVerticalScrollIndicator={false}
      >
        {showHeader && title && description && (
          <PageHeader 
            title={title} 
            description={description} 
            subtitle={subtitle} 
          />
        )}
        <View style={styles.content}>
          {children}
        </View>
      </ContentWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});