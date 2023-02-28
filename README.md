# Выпускной командный проект курса [Мидл фронтенд-разработчик](https://practicum.yandex.ru/middle-frontend/)

# FlappyBird
<img src="https://user-images.githubusercontent.com/70837634/220103879-04805743-45f0-4e50-959e-9da15aba4b4b.png" alt="demo" style="width: 600px;"/>  

Демо: [Ссылка](https://pachka-i-tochka.ya-praktikum.tech)

## Стек использумых технологий и Web API:
- `React`, `Redux Toolkit`
- `Ant Design`, `Sass`
- `Express`
- `Docker`, `Docker-Compose` 
- `PostgreSQL` 
- `nginx`
- `Canvas`
- `ServiceWorker`, `Web Audio`

## Мой вклад в проект:
- `разработка дизайн-концепции, ввод основных элементов и настройка темы Ant Design`
- `верстка стартовой страницы, авторизации, сведения о команде`
- `реализация авторизации с валидацией`
- `добавление возможности oAuth с помощью YandexID`
- `добавление и настройка хранилища Redux`
- `настройка SSR`
- `добавление возможности переключать темы (фронт и бэк)` 
- `добавление в проект ServiceWorker (в процессе), Web Audio` 

## Установка и запуск проекта

Для запуска клонируйте репозиторий и выполните следующие действия:

- Убедитесь что у вас установлен `node` и `docker`
- `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
- `yarn build` - для корректной работы SSR

Проект представляет из себя `монорепозиторий` на основе [`lerna`](https://github.com/lerna/lerna) и состоит из следующих пакетов:

### Управление зависимостями

Чтобы добавить зависимость для клиента:
```shell
yarn lerna add {your_dep} --scope client
```

Для сервера:
```shell
yarn lerna add {your_dep} --scope server
```

И для клиента и для сервер:
```shell
yarn lerna add {your_dep}
```

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`:
```shell
yarn lerna add {your_dep} --dev --scope server
```

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker-compose up` - запустит два сервиса

1. раздача фронтовой статики, по умолчанию localhost:3000 (server)
2. postgres, вашу базу данных (postgres)

P.S. в папке client в .env файле указать url, на котором будет клиент (для корректных ajax запросов)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker-compose up {sevice_name}`, например `docker-compose up server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

                                 
