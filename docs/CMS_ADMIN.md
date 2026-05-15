# CMS Admin

## Admin URL

```text
http://localhost:1337/admin
```

## Language

The Strapi admin panel is configured with these available interface languages:

- Simplified Chinese: `zh-Hans`
- English: `en`

On the first login, Strapi may still show the login screen in the browser/default language. After logging in, open the user profile/preferences menu and choose Simplified Chinese if it is not selected automatically.

The local administrator account has also been updated in PostgreSQL with:

```text
prefered_language = zh-Hans
```

If the browser still shows the old interface, log out and log back in, then hard refresh the page.

## Custom Content Types

The content type display names are localized for easier editing:

- `工具`
- `分类`
- `来源`
- `导入日志`

API field names remain in English to keep frontend development and integrations maintainable.
