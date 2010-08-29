var gone = exports.gone = function(token, res) {
  res.render('gone.jade', {
    locals: {
      title: 'Drop Node',
      token: token,
    } 
  }); 
};