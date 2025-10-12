# API Services Documentation

This directory contains reusable API services for the frontend application.

## Architecture

The API service layer follows a modular, reusable architecture:

```
services/
├── api.config.ts       # API configuration and endpoints
├── api.service.ts      # Base API service with HTTP methods
├── contact.service.ts  # Contact-specific API service
└── index.ts           # Central export point
```

## Core Components

### 1. API Configuration (`api.config.ts`)

Centralized configuration for API endpoints and settings.

**Features:**
- Environment-based API URL configuration
- Centralized endpoint definitions
- Type-safe endpoint methods
- HTTP method enums

**Usage:**
```typescript
import { API_ENDPOINTS, API_BASE_URL } from '@/services/api.config';

// Get contact endpoint
const endpoint = API_ENDPOINTS.CONTACT.CREATE;

// Get dynamic endpoint
const byId = API_ENDPOINTS.CONTACT.GET_BY_ID('123');
```

### 2. Base API Service (`api.service.ts`)

Reusable HTTP client with built-in error handling and authentication.

**Features:**
- Standard HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Automatic JSON serialization
- Centralized error handling
- Authentication token management
- Credential support for cookies
- Type-safe responses

**Usage:**
```typescript
import { apiService } from '@/services/api.service';

// GET request
const response = await apiService.get('/endpoint');

// POST request
const response = await apiService.post('/endpoint', { data: 'value' });

// PUT request
const response = await apiService.put('/endpoint/123', { data: 'value' });

// DELETE request
const response = await apiService.delete('/endpoint/123');
```

**Error Handling:**
```typescript
import { ApiError } from '@/services/api.service';

try {
  await apiService.post('/endpoint', data);
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.message);
    console.error('Status Code:', error.statusCode);
    console.error('Validation Errors:', error.errors);
  }
}
```

### 3. Contact Service (`contact.service.ts`)

Specialized service for contact-related operations.

**Features:**
- Create contact submissions
- Retrieve contacts (with various filters)
- Update contacts (admin)
- Delete contacts (admin)
- Search and statistics
- Data transformation between frontend and backend formats

**Usage:**
```typescript
import { contactService } from '@/services/contact.service';

// Create a contact
const contact = await contactService.createContact(formData);

// Get all contacts
const contacts = await contactService.getAllContacts();

// Get by email
const contacts = await contactService.getContactByEmail('user@example.com');

// Get recent contacts
const recent = await contactService.getRecentContacts();

// Get statistics
const stats = await contactService.getContactStats();

// Search contacts
const results = await contactService.searchContacts({
  query: 'search term',
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  order: 'desc'
});
```

## Using the Services in Components

### Option 1: Direct Service Usage

```typescript
import { contactService } from '@/services/contact.service';
import { ApiError } from '@/services/api.service';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const result = await contactService.createContact(formData);
      console.log('Success:', result);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('API Error:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

### Option 2: Using the Custom Hook

The `useContactForm` hook provides a complete contact form management solution:

```typescript
import { useContactForm } from '@/hooks/useContactForm';

const MyComponent = () => {
  const {
    formData,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
    resetForm
  } = useContactForm({
    onSuccess: () => {
      console.log('Form submitted successfully!');
    },
    onError: (error) => {
      console.error('Form submission failed:', error);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

## Data Transformation

The contact service automatically transforms data between frontend and backend formats:

**Frontend Format:**
```typescript
{
  name: string;
  email: string;
  phone: string;
  company: string;        // Frontend uses 'company'
  country: string;
  jobTitle: string;       // Frontend uses 'jobTitle'
  jobDetails: string;     // Frontend uses 'jobDetails'
}
```

**Backend Format:**
```typescript
{
  name: string;
  email: string;
  phone: string;
  company_name: string;   // Backend uses 'company_name'
  country: string;
  job_title: string;      // Backend uses 'job_title'
  message: string;        // Backend uses 'message'
}
```

## Environment Configuration

Create a `.env` file in the frontend directory:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

For production:
```bash
VITE_API_BASE_URL=https://api.yourdomain.com
```

## Adding New Services

To add a new service (e.g., feedback service):

1. **Create the service file** (`services/feedback.service.ts`):

```typescript
import { apiService } from './api.service';
import { API_ENDPOINTS } from './api.config';

class FeedbackService {
  async createFeedback(data: FeedbackData) {
    const response = await apiService.post(
      API_ENDPOINTS.FEEDBACK.CREATE,
      data
    );
    return response.data;
  }

  async getAllFeedback() {
    const response = await apiService.get(API_ENDPOINTS.FEEDBACK.GET_ALL);
    return response.data;
  }
}

export const feedbackService = new FeedbackService();
```

2. **Add endpoints** to `api.config.ts`:

```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints
  FEEDBACK: {
    CREATE: '/feedback/create',
    GET_ALL: '/feedback',
    GET_BY_ID: (id: string) => `/feedback/${id}`,
  },
};
```

3. **Export from index** (`services/index.ts`):

```typescript
export * from './feedback.service';
export { feedbackService } from './feedback.service';
```

## Best Practices

1. **Always use type-safe interfaces** for request/response data
2. **Handle errors properly** using try-catch and ApiError
3. **Use the provided hooks** when available for common operations
4. **Keep services focused** - one service per domain entity
5. **Transform data** at the service layer, not in components
6. **Use environment variables** for API configuration
7. **Add loading states** for better UX
8. **Validate data** before sending to API

## Testing

When testing components that use these services, you can mock them:

```typescript
import { contactService } from '@/services/contact.service';

jest.mock('@/services/contact.service', () => ({
  contactService: {
    createContact: jest.fn().mockResolvedValue({ id: '123' }),
  },
}));

// In your test
await contactService.createContact(mockData);
expect(contactService.createContact).toHaveBeenCalledWith(mockData);
```

## Error Handling

The API service provides structured error handling:

```typescript
try {
  await contactService.createContact(data);
} catch (error) {
  if (error instanceof ApiError) {
    // Network or server error
    console.error('Status:', error.statusCode);
    console.error('Message:', error.message);

    // Validation errors from backend
    if (error.errors) {
      error.errors.forEach(err => {
        console.error('Field:', err.field);
        console.error('Message:', err.message);
      });
    }
  }
}
```

## TypeScript Support

All services are fully typed with TypeScript interfaces:

- `ContactFormData` - Frontend form structure
- `ContactApiPayload` - Backend API format
- `Contact` - Contact entity with database fields
- `ContactStats` - Statistics response
- `ApiResponse<T>` - Generic API response wrapper
- `ApiError` - Custom error class

## Future Enhancements

This architecture supports easy addition of:
- Request/response interceptors
- Retry logic
- Request caching
- Request cancellation
- Progress tracking for uploads
- WebSocket integration
- GraphQL support
