# Quick Reference - Contact API Integration

## Import Statements

```typescript
// Import the service
import { contactService } from '@/services/contact.service';
import { ApiError } from '@/services/api.service';

// Import the hook
import { useContactForm } from '@/hooks/useContactForm';

// Import the component
import { ContactFormExample } from '@/components/ContactFormExample';

// Import types
import type { ContactFormData, Contact } from '@/types/contact.types';
```

## Quick Usage Examples

### 1. Using the Hook (Easiest)

```typescript
const MyComponent = () => {
  const { toast } = useToast();

  const {
    formData,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
  } = useContactForm({
    onSuccess: () => {
      toast({ title: "Success!", description: "Form submitted." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error, variant: "destructive" });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        disabled={isSubmitting}
      />
      {error && <p>{error}</p>}
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

### 2. Using the Service Directly

```typescript
const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: ContactFormData) => {
    setIsLoading(true);
    try {
      const result = await contactService.createContact(formData);
      console.log('Success:', result);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('Error:', error.message);
        console.error('Status:', error.statusCode);
        console.error('Validation:', error.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return <button onClick={() => handleSubmit(data)}>Submit</button>;
};
```

### 3. Using the Reusable Component

```typescript
const MyPage = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactFormExample
        onSuccess={() => console.log('Form submitted!')}
        className="max-w-2xl mx-auto"
      />
    </div>
  );
};
```

## All Available Methods

```typescript
// Create
await contactService.createContact(formData);

// Read All
await contactService.getAllContacts();

// Read By ID
await contactService.getContactById('123');

// Search
await contactService.getContactByEmail('user@example.com');
await contactService.getContactsByName('John');
await contactService.getContactsByPhone('1234567890');
await contactService.getContactsByCompany('Acme');
await contactService.getContactsByJobTitle('CEO');
await contactService.getContactsByCountry('United States');

// Get Recent
await contactService.getRecentContacts();

// Get Stats
await contactService.getContactCount();
await contactService.getContactStats();

// Search with filters
await contactService.searchContacts({
  query: 'search term',
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  order: 'desc'
});

// Update (admin)
await contactService.updateContact('123', partialFormData);

// Delete (admin)
await contactService.deleteContact('123');
```

## Form Fields

```typescript
interface ContactFormData {
  name: string;         // Required, 3-20 chars
  email: string;        // Required, valid email
  phone: string;        // Optional, 10 digits if provided
  company: string;      // Required, 2-30 chars
  country: string;      // Required, 2-30 chars
  jobTitle: string;     // Required, 2-30 chars
  jobDetails: string;   // Required, 10-50000 chars
}
```

## Error Handling

```typescript
try {
  await contactService.createContact(data);
} catch (error) {
  if (error instanceof ApiError) {
    // Network error
    if (error.statusCode === 0) {
      console.log('Network error');
    }

    // Validation error
    if (error.statusCode === 422) {
      error.errors?.forEach(err => {
        console.log(`${err.field}: ${err.message}`);
      });
    }

    // Server error
    if (error.statusCode >= 500) {
      console.log('Server error');
    }
  }
}
```

## Environment Variables

```bash
# .env file
VITE_API_BASE_URL=http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/contact/create` | Submit form |
| GET | `/contact` | Get all |
| GET | `/contact/:id` | Get one |
| GET | `/contact/email/:email` | By email |
| GET | `/contact/recent` | Recent |
| GET | `/contact/stats` | Statistics |
| PUT | `/contact/:id` | Update |
| DELETE | `/contact/:id` | Delete |

## Type Definitions

```typescript
// Form data (frontend)
type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  jobTitle: string;
  jobDetails: string;
}

// API payload (backend)
type ContactApiPayload = {
  name: string;
  email: string;
  phone: string;
  company_name: string;  // Maps to 'company'
  country: string;
  job_title: string;     // Maps to 'jobTitle'
  message: string;       // Maps to 'jobDetails'
}

// Response (database)
type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  country: string;
  job_title: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
```

## Common Patterns

### Pattern 1: Form with Custom Logic

```typescript
const MyForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useContactForm({
    onSuccess: customSuccessHandler,
    onError: customErrorHandler,
  });

  return <form onSubmit={handleSubmit}>...</form>;
};
```

### Pattern 2: Fetch Data for Display

```typescript
const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    contactService.getRecentContacts()
      .then(setContacts)
      .catch(console.error);
  }, []);

  return <div>{contacts.map(c => <div>{c.name}</div>)}</div>;
};
```

### Pattern 3: Admin Dashboard

```typescript
const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    contactService.getContactStats()
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Total: {stats?.total}</h2>
      <h2>Today: {stats?.today}</h2>
    </div>
  );
};
```

## Testing

```bash
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm run dev

# Visit
http://localhost:5173/contact

# Test
1. Fill valid form → Success ✓
2. Invalid email → Error ✓
3. Missing fields → Error ✓
4. Invalid phone → Error ✓
```

## Extending for New Features

```typescript
// 1. Add endpoint to api.config.ts
FEEDBACK: {
  CREATE: '/feedback/create',
}

// 2. Create service
class FeedbackService {
  async create(data) {
    return await apiService.post(API_ENDPOINTS.FEEDBACK.CREATE, data);
  }
}
export const feedbackService = new FeedbackService();

// 3. Use in component
import { feedbackService } from '@/services';
await feedbackService.create(data);
```

## File Locations

```
Services:     frontend/src/services/
Hooks:        frontend/src/hooks/
Types:        frontend/src/types/
Components:   frontend/src/components/
Pages:        frontend/src/pages/
Config:       frontend/.env
```

## Documentation

- **Service Layer**: `frontend/src/services/README.md`
- **Integration Guide**: `INTEGRATION_GUIDE.md`
- **Implementation**: `IMPLEMENTATION_SUMMARY.md`
- **Architecture**: `ARCHITECTURE.md`
- **Quick Ref**: `QUICK_REFERENCE.md` (this file)

## Troubleshooting

**Problem**: CORS error
**Solution**: Check backend CORS config allows frontend origin

**Problem**: 404 error
**Solution**: Verify VITE_API_BASE_URL in .env

**Problem**: Validation error
**Solution**: Check console for detailed backend error messages

**Problem**: Build error
**Solution**: Run `npm run build` to see TypeScript errors

## Key Benefits

✅ Reusable across entire app
✅ Type-safe with TypeScript
✅ Comprehensive error handling
✅ Well documented
✅ Easy to extend
✅ Production ready

---

For detailed documentation, see `INTEGRATION_GUIDE.md` and `frontend/src/services/README.md`
