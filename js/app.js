new Vue({
  el: "#app",
  data: {
    username: null,
    timeline: [],
    error: false,
    errorMsg: null,
    classe: "is-primary"
  },
  methods: {
    getUserTimeline() {
      axios
        .get(`https://api.github.com/users/${this.username}/repos`)
        .then(response => {
          this.timeline = [];
          this.error = false;
          this.errorMsg = null;
          this.classe = "is-primary";
          response.data.forEach(element => {
            let date = this.getDateFormat(element.created_at);
            this.timeline.push({
              sortByDate: new Date(element.created_at),
              date: date,
              name: element.name,
              content: element.description,
              link: element.html_url,
              website : element.homepage
            });
          });
        })
        .then(() => {
          this.timeline.sort(function(a, b) {
            return b.sortByDate - a.sortByDate;
          });
        })
        .catch(() => {
          this.classe = "is-danger";
          this.error = true;
          this.errorMsg = "L'utilisateur n'a pas pu être trouvé";
        });
    },
    getDateFormat(element) {
      const today = new Date(element);
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      return (date = `${dd}/${mm}/${yyyy}`);
    }
  }
});