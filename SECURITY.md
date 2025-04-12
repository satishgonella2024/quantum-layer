# Security Policy

## Supported Versions

Only the latest major version of QuantumLayer is currently receiving security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security issues seriously. If you discover a security vulnerability within QuantumLayer, please follow these steps:

1. **Do not disclose the vulnerability publicly**
2. Create a security advisory by going to the Security tab of the repository
3. Provide detailed steps to reproduce the vulnerability
4. Allow time for the maintainers to address the issue before any public disclosure

You can expect an acknowledgment of your report within 48 hours, and we'll keep you informed about our progress in addressing the vulnerability.

## Security Best Practices

When using QuantumLayer, please follow these security best practices:

### API Keys

- Store API keys securely, preferably using environment variables
- Do not commit API keys to source control
- Rotate API keys periodically

### Memory Management

- Use appropriate TTL settings for sensitive information
- Consider using the 'none' memory type for sensitive conversations
- Regularly clear memory for long-running agents

### Secure Deployment

- Run QuantumLayer behind a proper authentication layer
- Use HTTPS for all communications
- Keep dependencies updated

## Disclosure Policy

When a security vulnerability is reported, we will:

1. Confirm the vulnerability and determine its impact
2. Develop and test a fix
3. Prepare a security advisory with details about the vulnerability
4. Release a patched version and publish the advisory

We aim to address critical security vulnerabilities within 7 days, and less severe issues within 30 days.
