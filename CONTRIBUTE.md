# Contributing

## Getting started

1. [Submit an issue](https://github.com/AdeleD/react-paginate/issues)
2. Fork the repository
3. Create a dedicated branch (never ever work in `master`)
4. Run `npm start` http://localhost:3000
5. Fix bugs or implement features
6. Always write tests
7. Format with Prettier `npm run format` and check ESLint `npm run lint`
8. Document your changes in [`CHANGELOG.md`](/CHANGELOG.md)
9. If props have changed, update the TypeScript definitions in [`dist/index.d.ts`](/dist/index.d.ts)
10. Submit the PR

Run tests:

```console
npm test
```

## Releasing

1. Build the code to be released `npm run build`
2. Check the [`CHANGELOG.md`](/CHANGELOG.md) is complete
3. Update the version in [`package.json`](/package.json)
4. Tag the new version `git tag v8.0.0` and push the tag `git push --tags`
5. Create a [release note](https://github.com/AdeleD/react-paginate/releases)
6. Publish on NPM
