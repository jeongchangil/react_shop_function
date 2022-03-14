const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

//몽고디비 스키마 형식
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// save 이벤트가 일어나기 전에 pre의 콜백함수를 사용
userSchema.pre("save", function (next) {
  // this는 userSchema를 바라봄
  var user = this;

  // isModified는 password가 변경되었을 경우 true, 아니면 false를 반환함
  if (user.isModified("password")) {
    // password가 변경되었다면 salt를 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      // password를 암호화
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    // password가 변경되지 않으면 암호화하지 않고 저장
    next();
  }
});

// 비밀번호 비교
userSchema.methods.comparePassword = function (plainPassword, cb) {
  //암호화 되어 있는 비밀번호 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    // 결과는 isMatch로 boolean 값 반환
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  //토큰 생성
  var token = jwt.sign(user._id.toHexString(), "secret");
  var oneHour = moment().add(1, "hour").valueOf();

  user.tokenExp = oneHour;
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// jwt 유효성 검사
userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  // 토큰 복호화해서 비교
  jwt.verify(token, "secret", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
