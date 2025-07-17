# Social Support Portal - Government Financial Assistance Application

A modern, accessible web application for citizens to apply for government financial assistance with AI-powered writing assistance.

## Features

- Multi-step Form Wizard: 3-step application process (Personal Info → Family & Financial Info → Situation Descriptions)
- AI Writing Assistance: OpenAI GPT-3.5 integration for helping users write situation descriptions
- Bilingual Support: English and Arabic (RTL) language support
- Responsive Design: Mobile-first approach, works on all devices
- Accessibility: WCAG 2.1 compliant with ARIA labels, keyboard navigation, and high contrast support
- Progress Saving: Local storage saves progress automatically
- Form Validation: Real-time validation with helpful error messages

## Tech Stack

- Frontend: React 18, TypeScript
- State Management: Redux Toolkit
- Form Handling: React Hook Form
- Styling: Tailwind CSS
- Routing: React Router DOM
- HTTP Client: Axios
- Internationalization: React-i18next
- Testing: Jest, React Testing Library
- Build Tool: Create React App

## Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- OpenAI API key (for AI assistance feature)

### Setup Steps

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd social-support-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. Open your browser
   Navigate to [http://localhost:3000](http://localhost:3000)

## OpenAI API Setup

### Getting an API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env` file

### API Configuration

The application uses the OpenAI GPT-3.5-turbo model for text generation. The API integration includes:

- Endpoint: `https://api.openai.com/v1/chat/completions`
- Model: `gpt-3.5-turbo`
- Max Tokens: 200
- Temperature: 0.7
- Timeout: 30 seconds

### Error Handling

The application handles various API scenarios:
- Invalid API key
- Rate limiting
- Network timeouts
- Service unavailability

## Form Flow

### Step 1: Personal Information
- Full Name, National ID, Date of Birth
- Gender, Address, City, State, Country
- Phone Number, Email Address

### Step 2: Family & Financial Information
- Marital Status, Number of Dependents
- Employment Status, Monthly Income
- Housing Status

### Step 3: Situation Descriptions
- Current Financial Situation (with AI assistance)
- Employment Circumstances (with AI assistance)
- Reason for Applying (with AI assistance)

### Validation Rules
- Required field validation
- Format validation (email, phone, national ID)
- Range validation (income, dependents)
- Real-time error display

## AI Integration

### Help Me Write Feature
- Available for all three text areas in Step 3
- Context-aware suggestions
- Editable suggestions popup
- Error handling for API failures

### Prompt Engineering
- Tailored prompts for each field type
- Professional tone enforcement
- Appropriate length guidance
- Contextual information inclusion

## Available Scripts

- `npm start` - Development server
- `npm test` - Run tests
- `npm run build` - Production build
- `npm run eject` - Eject from Create React App

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
```
REACT_APP_OPENAI_API_KEY=your_api_key
REACT_APP_API_BASE_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

### Hosting Options
- Netlify: Drag and drop deployment
- Vercel: GitHub integration
- AWS S3: Static website hosting
- GitHub Pages: Free hosting for public repos

## Troubleshooting

### Common Issues

1. OpenAI API Not Working
   - Check API key validity
   - Verify environment variable setup
   - Check network connectivity

2. Build Fails
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify all dependencies

3. Styling Issues
   - Ensure Tailwind CSS is properly configured
   - Check PostCSS configuration
   - Verify CSS imports

### Getting Help

1. Check the console for error messages
2. Review the Network tab for API issues
3. Verify environment variables are set
4. Check browser compatibility (modern browsers only)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## Support

For technical support or questions:
- Create an issue in the repository
- Review the troubleshooting section
- Check the documentation

---

Note: This application is a demonstration project for government social support services. In a production environment, ensure proper security measures, data protection, and compliance with local regulations.