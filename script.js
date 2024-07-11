const GITHUB_TOKEN = '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';

const app = Vue.createApp({
    data() {
        return {
            showSearch: true,
            username: '',
            user: {},
        };
    },
    methods: {
        fetchUser() {
            axios.get(`https://api.github.com/users/${this.username}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            })
                .then(response => {
                    this.user = response.data;
                    this.repoCount = response.data.public_repos;
                    this.showSearch = false;
                })
                .catch(error => {
                    alert('Usuário não encontrado. Tente novamente.');
                    console.error('Erro:', error);
                });
        }
    }
});

app.mount('#app');
