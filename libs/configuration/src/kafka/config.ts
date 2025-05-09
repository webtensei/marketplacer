export const KAFKA_CONFIG = {
  // Brokers configuration
  BROKERS: ['localhost:9092'] as string[],
  
  // Service identifiers
  CONSUMER_GROUPS: {
    USER_SERVICE: 'user-service-group',
    AUTH_SERVICE: 'auth-service-group',
    TEAM_SERVICE: 'team-service-group',
  },

  SERVICES: {
    USER_SERVICE: 'user-service',
    AUTH_SERVICE: 'auth-service',
    TEAM_SERVICE: 'team-service',
  },

  // Client IDs for each service
  CLIENT_IDS: {
    USER_SERVICE: 'user-service-client',
    AUTH_SERVICE: 'auth-service-client',
    TEAM_SERVICE: 'team-service-client',
  },

  // Topics configuration
  TOPICS: {
    USER: {
      CREATE: 'user.create',
      UPDATE: 'user.update',
      DELETE: 'user.delete',
      GET_ONE: 'user.get-one',
      GET_ALL: 'user.get-all',
      GET_USER_BY_ID: 'user.get-user-by-id',
    },
    AUTH: {
      LOGIN: 'auth.login',
      LOGOUT: 'auth.logout',
      REGISTER: 'auth.register',
      REFRESH_TOKEN: 'auth.refresh-token',
      RESET_PASSWORD: 'auth.reset-password',
      
      GOOGLE: 'auth.google',
      GOOGLE_CALLBACK: 'auth.google-callback',
      GOOGLE_SUCCESS: 'auth.google-success',
      YANDEX: 'auth.yandex',
      YANDEX_CALLBACK: 'auth.yandex-callback',
      YANDEX_SUCCESS: 'auth.yandex-success',
    },
  },

  // Kafka configuration options
  OPTIONS: {
    // Producer configuration
    PRODUCER: {
      allowAutoTopicCreation: true,
      idempotent: true, // Ensures exactly-once delivery
      acks: 'all', // Requires acknowledgment from all replicas
      retries: 3,
    },
    
    // Consumer configuration
    CONSUMER: {
      allowAutoTopicCreation: true,
      autoOffsetReset: 'earliest', // Start reading from the beginning if no offset found
      enableAutoCommit: false, // Manual commit for better control
      maxInFlightRequests: 1, // Process one message at a time
      sessionTimeout: 30000, // 30 seconds
      heartbeatInterval: 3000, // 3 seconds
    },
  },

  // Error topics for dead letter queues
  ERROR_TOPICS: {
    USER_SERVICE: 'user-service.errors',
    AUTH_SERVICE: 'auth-service.errors',
  },
} as const;


// Type definitions for better TypeScript support
export type KafkaTopics = typeof KAFKA_CONFIG.TOPICS;


// Environment type
export type Environment = 'production' | 'staging' | 'development';

// Helper function to get full topic name (useful for namespacing in different environments)
export const getTopicName = (topic: string, environment: Environment = (process.env['NODE_ENV'] as Environment) || 'development'): string => {
  const prefix = environment === 'production' ? 'prod' : environment === 'staging' ? 'stg' : 'dev';
  return `${prefix}.${topic}`;
}; 