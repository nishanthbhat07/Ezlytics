import { ThemeColors } from "../../../helpers/ThemeColors";
const colors = ThemeColors();
export const makeDataPlotableBivariate = (data, col1, col2) => {
  const data_ = [];
  data.map((item) => {
    var row = {
      x: item.col1,
      y: item.col2,
    };
    data_.push(row);
  });
  const obj = {
    datasets: [
      {
        borderWidth: 2,
        label: `${col2} Vs. ${col1}`,
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: data_,
      },
    ],
  };
  return obj;
};
export const makeDataPlotableUnivariate = (data, col1) => {
  const data_ = {};
  data.map((el) => {
    if (data_[el]) {
      let c = data_[el];
      data_[el] = c + 1;
    } else {
      data_[el] = 1;
    }
  });
  console.log(data_);
  const obj = {
    labels: Object.keys(data_),
    datasets: [
      {
        borderWidth: 2,
        label: ``,
        borderColor: [
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
        ],
        backgroundColor: [
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
        ],
        data: Object.values(data_),
      },
    ],
  };
  return obj;
};
