'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IsNurse } from '@/app/lib/rbac';
import { DEMO_NURSE_TASKS, Task } from '../lib/nurse-data';

export default function TaskListPage() {
  const [tasks, setTasks] = useState(DEMO_NURSE_TASKS);
  const [showCompleted, setShowCompleted] = useState(false);

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const markComplete = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: 'completed' as const } : task
    ));
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'vitals': return '📊';
      case 'medication': return '💊';
      case 'vaccination': return '💉';
      case 'followup': return '📞';
      default: return '📋';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-danger-bg text-danger';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'vitals': return 'Vitals';
      case 'medication': return 'Medication';
      case 'vaccination': return 'Vaccination';
      case 'followup': return 'Follow-up';
      default: return type;
    }
  };

  return (
    <IsNurse fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You need nurse privileges to access this page.</p>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Link href="/nurse" className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-500 text-sm">Tasks</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Task List</h1>
                <p className="text-gray-500 mt-1">Manage your daily tasks and responsibilities</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{pendingTasks.length}</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Pending Tasks */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h2>
            {pendingTasks.length > 0 ? (
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{getTaskIcon(task.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityBadge(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                            {getTypeLabel(task.type)}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900">{task.patientName}</p>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-400">Due: {task.dueTime}</span>
                          <Link
                            href={`/nurse/vitals?patient=${task.patientId}`}
                            className="text-xs text-primary-600 hover:text-primary-700"
                          >
                            View patient
                          </Link>
                        </div>
                      </div>
                      <button
                        onClick={() => markComplete(task.id)}
                        className="flex-shrink-0 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Mark Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">All tasks completed!</h3>
                <p className="text-gray-500">Great job! You've completed all your tasks for today.</p>
              </div>
            )}
          </section>

          {/* Completed Tasks */}
          <section>
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <svg
                className={`w-5 h-5 transition-transform ${showCompleted ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="font-medium">Completed Tasks ({completedTasks.length})</span>
            </button>

            {showCompleted && (
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <div key={task.id} className="bg-gray-50 rounded-xl border border-gray-200 p-4 opacity-75">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{getTaskIcon(task.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            Completed
                          </span>
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-600">
                            {getTypeLabel(task.type)}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900">{task.patientName}</p>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </IsNurse>
  );
}