/**
 * GET /
 * Homepage
*/
exports.homepage = async (req, res) => {
  const locals = {
    title: "RakshaSutraX-Playbook for Cybersecurity Incidents",
    description: "The Ultimate Sutra for Incident Response.",
  }  
  res.render('index', {
    locals,
    layout: '../views/layouts/front-page'
  });  
}

/**
 * GET /
 * Homepage
*/
exports.about = async (req, res) => {
    const locals = {
      title: "About-RakshaSutraX-Playbook for Cybersecurity Incidents",
      description: "The Ultimate Sutra for Incident Response.",
    }  
  
  res. render ('about', locals);
  }
  