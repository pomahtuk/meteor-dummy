AdminConfig = {
  name: 'Ботаника',
  adminEmails: ['pman89@ya.ru'],
  collections: {
    News: {
      label: 'Новости',
      tableColumns: [
				{ label: 'Название', name: 'title' }
			]
    },
    Houses: {
      label: 'Дома',
      color: 'green',
      icon: 'home',
      tableColumns: [
				{ label: 'Название', name: 'title' }
			]
    },
    Pages: {
      label: 'Страницы',
			color: 'red',
			icon: 'pencil',
			tableColumns: [
				{ label: 'Название', name: 'title' },
				{ label: 'Адрес', name: 'slug'}
			]
    },
  },
  dashboard: {
  	homeUrl: '/prototype'
  },
  autoForm: {
  	omitFields: ['createdAt', 'updatedAt']
  }
};
