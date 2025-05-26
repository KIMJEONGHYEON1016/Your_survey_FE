module.exports = {
  apps: [
    {
      name: 'your-survey-frontend',
      script: 'npm',
      args: 'run start',
      cwd: '/var/lib/jenkins/workspace/survey_frontend',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        // NEXT_PUBLIC_API_URL은 .env.production에서 관리
      }
    }
  ]
};
np