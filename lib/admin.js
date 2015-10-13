AdminConfig = {
  name: 'Botanika',
  adminEmails: ['pman89@ya.ru'],
  collections: {
    Pages: {
			color: 'red',
			icon: 'pencil',
			tableColumns: [
				{ label: 'Title', name: 'title' },
				{ label: 'Slug', name: 'slug'}
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
