let baseURL = "http://numbersapi.com";





async function api_call() {
    const num = 8
    let data = await $.getJSON(`${baseURL}/${num}?json`);
    console.log(data);
  }
  api_call();




async function multi_request() {
    const nums = [2, 8, 14, 21];
    let data = await $.getJSON(`${baseURL}/${nums}?json`);
    console.log(data);
  }
  multi_request();



  async function num_four_facts() {
    const num = 8
    let facts = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${num}?json`))
    );
    facts.forEach(data => {
      $('body').append(`<p>${data.text}</p>`);
    });
  }
  part3();