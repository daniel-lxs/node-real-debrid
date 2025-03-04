# Real-Debrid API

A Node.js wrapper for the [Real-Debrid](https://real-debrid.com/) API.

## Installation

```bash
npm install real-debrid-api
```

## Usage

### JavaScript

```javascript
const RealDebridClient = require('real-debrid-api');

const client = new RealDebridClient('YOUR_API_TOKEN');

// Get user info
client.user.get()
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Unrestrict a link
client.unrestrict.link('https://example.com/file.rar')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

### TypeScript

```typescript
import RealDebridClient from 'real-debrid-api';
import { UserResponse, UnrestrictLinkResponse } from 'real-debrid-api';

const client = new RealDebridClient('YOUR_API_TOKEN');

// Get user info
client.user.get()
  .then(response => {
    const userData: UserResponse = response.data;
    console.log(userData);
  })
  .catch(error => console.error(error));

// Unrestrict a link
client.unrestrict.link('https://example.com/file.rar')
  .then(response => {
    const linkData: UnrestrictLinkResponse = response.data;
    console.log(linkData);
  })
  .catch(error => console.error(error));
```

## API Documentation

For detailed information about the Real-Debrid API, please refer to the [official documentation](https://api.real-debrid.com/).

## License

MIT