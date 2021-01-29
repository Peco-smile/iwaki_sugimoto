new Vue({
  el: '#app',
  vuetify: new Vuetify(),

  data: () => ({
    name: undefined,
    email: undefined,
    phone: undefined,
    type: undefined,
    contents: undefined,
    form: false,
    inputdata: false,
    makesure: true,
    rules: {
      required: (value) => !!value || '必須項目です',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || '正しい形式で入力してください'
      },
      phone: (value) => {
        const pattern = /^(0{1}\d{1,4}-{0,1}\d{1,4}-{0,1}\d{4})$/
        return pattern.test(value) || '7桁以上の半角数字で入力してください'
      },
    },
    loading: false,
    snackbar: false,
    snackbarText: undefined,
    snackbarError: false,
  }),

  methods: {
    clickBtnSend() {
      this.loading = true
      let params = new URLSearchParams()
      params.append('name', this.name)
      params.append('email', this.email)
      params.append('tel', this.phone)
      params.append('type', this.type)
      params.append('message', this.contents)
      axios
        .post('forms/mail.php', params)
        .then((response) => {
          this.snackbarText = response.data
          this.snackbar = true
          this.loading = false
          this.inputdata = false
          this.makesure = true
          this.$refs.form.reset()
        })
        .catch((error) => {
          this.snackbarError = true
          console.log('error')
        })
    },
  },
})
