// Copyright (c) 2021 Hiroki Takemura (kekeho)
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

function getRandomInt(min, max) {
    // min以上max未満で、ランダムな整数値を得る
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
