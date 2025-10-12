# Contact API Integration - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    PRESENTATION LAYER                        │   │
│  │  ┌─────────────┐  ┌──────────────────┐  ┌────────────────┐  │   │
│  │  │  Contact    │  │ ContactForm      │  │  Modal/Sidebar │  │   │
│  │  │  Page       │  │ Example          │  │  Components    │  │   │
│  │  │             │  │ (Reusable)       │  │                │  │   │
│  │  └──────┬──────┘  └────────┬─────────┘  └────────┬───────┘  │   │
│  │         │                  │                      │          │   │
│  └─────────┼──────────────────┼──────────────────────┼──────────┘   │
│            │                  │                      │              │
│  ┌─────────┼──────────────────┼──────────────────────┼──────────┐   │
│  │         ▼                  ▼                      ▼          │   │
│  │  ┌────────────────────────────────────────────────────────┐ │   │
│  │  │             CUSTOM HOOKS LAYER                         │ │   │
│  │  │                                                        │ │   │
│  │  │         useContactForm()                              │ │   │
│  │  │         - Form state management                       │ │   │
│  │  │         - Validation logic                            │ │   │
│  │  │         - API integration                             │ │   │
│  │  │         - Error handling                              │ │   │
│  │  │         - Loading states                              │ │   │
│  │  │                                                        │ │   │
│  │  └────────────────────────┬───────────────────────────────┘ │   │
│  │                           │                                 │   │
│  └───────────────────────────┼─────────────────────────────────┘   │
│                              │                                     │
│  ┌───────────────────────────┼─────────────────────────────────┐   │
│  │                           ▼                                 │   │
│  │  ┌────────────────────────────────────────────────────────┐ │   │
│  │  │              SERVICE LAYER                             │ │   │
│  │  │                                                        │ │   │
│  │  │  contactService                                       │ │   │
│  │  │  - createContact()                                    │ │   │
│  │  │  - getAllContacts()                                   │ │   │
│  │  │  - getContactById()                                   │ │   │
│  │  │  - getRecentContacts()                                │ │   │
│  │  │  - searchContacts()                                   │ │   │
│  │  │  - getContactStats()                                  │ │   │
│  │  │  + 9 more methods...                                  │ │   │
│  │  │                                                        │ │   │
│  │  │  ┌──────────────────────────────────────────────────┐ │ │   │
│  │  │  │   Data Transformation Layer                      │ │ │   │
│  │  │  │   - transformFormToApiPayload()                  │ │ │   │
│  │  │  │   - transformApiToFormData()                     │ │ │   │
│  │  │  │   Frontend ↔ Backend field mapping              │ │ │   │
│  │  │  └──────────────────────────────────────────────────┘ │ │   │
│  │  │                                                        │ │   │
│  │  └────────────────────────┬───────────────────────────────┘ │   │
│  │                           │                                 │   │
│  └───────────────────────────┼─────────────────────────────────┘   │
│                              │                                     │
│  ┌───────────────────────────┼─────────────────────────────────┐   │
│  │                           ▼                                 │   │
│  │  ┌────────────────────────────────────────────────────────┐ │   │
│  │  │           BASE API SERVICE (HTTP Client)               │ │   │
│  │  │                                                        │ │   │
│  │  │  apiService                                           │ │   │
│  │  │  - get()        - Generic HTTP methods               │ │   │
│  │  │  - post()       - Error handling                     │ │   │
│  │  │  - put()        - JSON serialization                 │ │   │
│  │  │  - delete()     - Auth token management             │ │   │
│  │  │  - patch()      - Type-safe responses               │ │   │
│  │  │                                                        │ │   │
│  │  └────────────────────────┬───────────────────────────────┘ │   │
│  │                           │                                 │   │
│  └───────────────────────────┼─────────────────────────────────┘   │
│                              │                                     │
│  ┌───────────────────────────┼─────────────────────────────────┐   │
│  │                           ▼                                 │   │
│  │  ┌────────────────────────────────────────────────────────┐ │   │
│  │  │            CONFIGURATION LAYER                         │ │   │
│  │  │                                                        │ │   │
│  │  │  api.config.ts                                        │ │   │
│  │  │  - API_BASE_URL (from env)                           │ │   │
│  │  │  - API_ENDPOINTS (all routes)                        │ │   │
│  │  │  - HttpMethod enum                                   │ │   │
│  │  │                                                        │ │   │
│  │  └────────────────────────────────────────────────────────┘ │   │
│  │                                                              │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              │                                     │
│  ┌───────────────────────────┼─────────────────────────────────┐   │
│  │                           ▼                                 │   │
│  │  ┌────────────────────────────────────────────────────────┐ │   │
│  │  │              TYPE DEFINITIONS                          │ │   │
│  │  │                                                        │ │   │
│  │  │  contact.types.ts                                     │ │   │
│  │  │  - ContactFormData                                    │ │   │
│  │  │  - ContactApiPayload                                  │ │   │
│  │  │  - Contact                                            │ │   │
│  │  │  - ValidationError                                    │ │   │
│  │  │  - ApiErrorResponse                                   │ │   │
│  │  │  - ContactStats                                       │ │   │
│  │  │                                                        │ │   │
│  │  └────────────────────────────────────────────────────────┘ │   │
│  │                                                              │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           │ HTTP/HTTPS (CORS enabled)
                           │ JSON Payload
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                          BACKEND                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    ROUTES LAYER                              │  │
│  │                                                              │  │
│  │  app.use("/contact", contactRouter)                         │  │
│  │                                                              │  │
│  │  POST   /contact/create          - Create contact           │  │
│  │  GET    /contact                 - Get all                  │  │
│  │  GET    /contact/:id             - Get by ID                │  │
│  │  GET    /contact/email/:email    - Get by email             │  │
│  │  GET    /contact/recent          - Recent contacts          │  │
│  │  GET    /contact/stats           - Statistics               │  │
│  │  PUT    /contact/:id             - Update (admin)           │  │
│  │  DELETE /contact/:id             - Delete (admin)           │  │
│  │                                                              │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                        │
│  ┌────────────────────────▼─────────────────────────────────────┐  │
│  │              MIDDLEWARE LAYER                                │  │
│  │                                                              │  │
│  │  - express-validator (Field validation)                     │  │
│  │  - CORS middleware                                           │  │
│  │  - authMiddleware (for admin routes)                        │  │
│  │  - Body parser                                               │  │
│  │                                                              │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                        │
│  ┌────────────────────────▼─────────────────────────────────────┐  │
│  │            CONTROLLERS LAYER                                 │  │
│  │                                                              │  │
│  │  contactControllers.js                                       │  │
│  │  - createContact()                                           │  │
│  │  - getAllContacts()                                          │  │
│  │  - getContactById()                                          │  │
│  │  - getContactByEmail()                                       │  │
│  │  - searchContacts()                                          │  │
│  │  - getContactStats()                                         │  │
│  │  + more...                                                   │  │
│  │                                                              │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                        │
│  ┌────────────────────────▼─────────────────────────────────────┐  │
│  │              SERVICES LAYER                                  │  │
│  │                                                              │  │
│  │  contactServices.js                                          │  │
│  │  - Business logic                                            │  │
│  │  - Data processing                                           │  │
│  │                                                              │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                        │
│  ┌────────────────────────▼─────────────────────────────────────┐  │
│  │               MODELS LAYER                                   │  │
│  │                                                              │  │
│  │  contactModels.js                                            │  │
│  │  - Mongoose schema                                           │  │
│  │  - Database operations                                       │  │
│  │                                                              │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                        │
└───────────────────────────┼─────────────────────────────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   MongoDB       │
                  │   Database      │
                  └─────────────────┘
```

## Data Flow

### Creating a Contact (POST /contact/create)

```
1. User fills form in Contact.tsx
   │
   ├─► Uses ContactFormData type
   │
2. Form submitted via handleSubmit
   │
   ├─► Calls useContactForm hook
   │   └─► Frontend validation
   │
3. Hook calls contactService.createContact()
   │
   ├─► Transforms data: FormData → ApiPayload
   │   └─► company → company_name
   │   └─► jobTitle → job_title
   │   └─► jobDetails → message
   │
4. contactService calls apiService.post()
   │
   ├─► Adds headers (Content-Type, Auth)
   │   └─► Serializes to JSON
   │
5. HTTP POST to backend
   │
   ├─► URL: http://localhost:5000/contact/create
   │   └─► Body: JSON payload
   │
6. Backend receives request
   │
   ├─► CORS middleware ✓
   │   └─► Body parser ✓
   │
7. Express-validator validates
   │
   ├─► Name: 3-20 chars ✓
   │   ├─► Email: valid format ✓
   │   ├─► Phone: 10 digits ✓
   │   └─► All required fields ✓
   │
8. If validation fails:
   │
   ├─► Returns 422 with errors array
   │   └─► Frontend displays errors
   │
9. If validation passes:
   │
   ├─► Controller → Service → Model
   │   └─► Saves to MongoDB
   │
10. Backend returns success
    │
    ├─► Status: 201
    │   └─► Body: { message, contact }
    │
11. Frontend receives response
    │
    ├─► apiService handles response
    │   └─► Returns ApiResponse<Contact>
    │
12. Hook processes success
    │
    ├─► Resets form
    │   ├─► Calls onSuccess callback
    │   └─► Shows success toast
    │
13. User sees success message!
```

## Reusability Patterns

### Pattern 1: Direct Service Usage

```
Component
   │
   ├─► import { contactService } from '@/services'
   │
   └─► contactService.createContact(data)
       └─► apiService.post()
           └─► Backend API
```

### Pattern 2: Using Custom Hook

```
Component
   │
   ├─► import { useContactForm } from '@/hooks'
   │
   ├─► const { handleSubmit, ... } = useContactForm()
   │
   └─► handleSubmit()
       └─► contactService.createContact()
           └─► apiService.post()
               └─► Backend API
```

### Pattern 3: Using Reusable Component

```
Page/Container
   │
   ├─► import { ContactFormExample } from '@/components'
   │
   └─► <ContactFormExample onSuccess={...} />
       └─► Uses useContactForm internally
           └─► contactService.createContact()
               └─► apiService.post()
                   └─► Backend API
```

## Error Handling Flow

```
API Call
   │
   ├─► Network Error?
   │   └─► ApiError("Network error occurred", 0)
   │       └─► Display: "Connection failed"
   │
   ├─► HTTP 422 (Validation)?
   │   └─► ApiError(message, 422, errors[])
   │       └─► Display: "Name must be 3-20 characters"
   │
   ├─► HTTP 400 (Bad Request)?
   │   └─► ApiError(message, 400)
   │       └─► Display: error.message
   │
   ├─► HTTP 500 (Server Error)?
   │   └─► ApiError(message, 500)
   │       └─► Display: "Server error occurred"
   │
   └─► Success (200/201)
       └─► Return data to component
           └─► Show success message
```

## Type Safety Flow

```
TypeScript Interfaces
   │
   ├─► ContactFormData (Frontend)
   │   └─► Used in components
   │
   ├─► ContactApiPayload (API)
   │   └─► Used in services
   │
   ├─► Contact (Database)
   │   └─► Used in responses
   │
   └─► Compile-time checks
       ├─► IDE autocomplete
       ├─► Type errors before runtime
       └─► Safe refactoring
```

## Extension Pattern (Adding New Service)

```
1. Add to api.config.ts
   │
   ├─► Define endpoints
   │
2. Create service file
   │
   ├─► Extend apiService
   │   └─► Implement methods
   │
3. Create types file
   │
   ├─► Define interfaces
   │
4. Create hook (optional)
   │
   ├─► Wrap service logic
   │   └─► Add state management
   │
5. Use in components
   │
   └─► import { newService } from '@/services'
```

## Benefits Summary

```
┌─────────────────────────────────────────┐
│         REUSABILITY                     │
│  • Services used in any component       │
│  • Hooks used in any component          │
│  • Components dropped anywhere          │
│  • Easy to extend                       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         TYPE SAFETY                     │
│  • All data typed                       │
│  • Compile-time checks                  │
│  • IDE support                          │
│  • Refactoring safety                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         MAINTAINABILITY                 │
│  • Single source of truth               │
│  • Centralized error handling           │
│  • Consistent patterns                  │
│  • Well documented                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         SCALABILITY                     │
│  • Add new services easily              │
│  • Add new endpoints easily             │
│  • Add new components easily            │
│  • Production ready                     │
└─────────────────────────────────────────┘
```

This architecture ensures clean, maintainable, and scalable code! 🎉
