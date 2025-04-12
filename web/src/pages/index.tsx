import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentActivity from '../components/dashboard/RecentActivity';
import AgentList from '../components/agents/AgentList';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>QuantumLayer - AI Agent Operating System</title>
        <meta name="description" content="Compose, orchestrate, and deploy intelligent agents" />
      </Head>

      <div className="px-4 py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Welcome to QuantumLayer, your AI-native Agent Operating System.
          </p>
        </header>

        <div className="mb-8">
          <DashboardStats />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Agents</h2>
                <Link href="/agents/new" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Create New Agent
                </Link>
              </div>
              <AgentList />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
