const GITHUB_TOKEN = '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';

const app = Vue.createApp({
    data() {
        return {
            showSearch: true,
            username: '',
            user: {},
            repos: [],
            filter: '',
            view: 'repos',
            repoCount: '',
            starredCount: ''
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
        },
        fetchRepos() {
            axios.get(this.user.repos_url, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            })
                .then(response => {
                    this.repos = response.data;
                })
                .catch(error => {
                    console.error('Erro ao buscar repositórios:', error);
                });
        },
        fetchStarred() {
            axios.get(`https://api.github.com/users/${this.username}/starred`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            })
                .then(response => {
                    this.repos = response.data;
                    this.starredCount = response.data.length;
                })
                .catch(error => {
                    console.error('Erro ao buscar favoritos:', error);
                });
        },
        viewRepos() {
            this.view = 'repos';
            this.fetchRepos();
        },
        viewStarred() {
            this.view = 'starred';
            this.fetchStarred();
        },
        reset() {
            this.showSearch = true;
            this.username = '';
            this.user = {};
            this.repos = [];
            this.filter = '';
            this.view = 'repos';
            this.repoCount = '';
            this.starredCount = '';
        }
    }
});

app.mount('#app');
