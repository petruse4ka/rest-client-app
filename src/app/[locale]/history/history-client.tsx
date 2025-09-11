'use client';

import { CSSProperties } from 'react';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { Card, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';

const { Title, Text } = Typography;

export default function HistoryView({ user }: { user: DecodedIdToken | null }) {
  // TODO: Placeholder component, will be replaced with real history view once backend data is ready
  const contentStyles: CSSProperties = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  };

  return (
    <Content style={contentStyles}>
      <Card style={{ maxWidth: 720, width: '100%' }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          History
        </Title>

        {user ? (
          <>
            <Text type="secondary">Authenticated user</Text>
            <div style={{ marginTop: 8 }}>
              <div>
                <b>UID:</b> {user.uid}
              </div>
              {user.email && (
                <div>
                  <b>Email:</b> {user.email}
                </div>
              )}
              {user.name && (
                <div>
                  <b>Name:</b> {user.name}
                </div>
              )}
            </div>
            <div style={{ marginTop: 16 }}>
              <Text>Здесь будет контент истории для авторизованных пользователей.</Text>
            </div>
          </>
        ) : (
          <>
            <Text type="danger">Вы не авторизованы.</Text>
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">Пожалуйста, войдите, чтобы просмотреть историю.</Text>
            </div>
          </>
        )}
      </Card>
    </Content>
  );
}
