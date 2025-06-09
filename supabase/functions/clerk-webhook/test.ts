// Test script for Clerk webhook
const testWebhook = async () => {
  const webhookUrl = 'http://localhost:54321/functions/v1/clerk-webhook';
  
  // Simulate a user.created event
  const testEvent = {
    type: 'user.created',
    data: {
      id: 'test_user_123',
      email_addresses: [{
        email_address: 'test@example.com'
      }]
    }
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEvent)
    });

    const result = await response.json();
    console.log('Webhook test result:', result);
  } catch (error) {
    console.error('Error testing webhook:', error);
  }
};

// Run the test
testWebhook(); 