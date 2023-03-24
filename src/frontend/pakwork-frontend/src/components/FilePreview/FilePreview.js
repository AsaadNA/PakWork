import React from "react";

const FilePreview = ({ fileUrl, fileName }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <>
        <img
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEXUlEQVR4nO1bW0wUVxhe0ketvhr7Xk364os+9IXIzADOWRf1zAEaKDWNmJRGm2JCvSVibK2FeG1orcRLK1aN2FpvxbJCbREJC3htrDYlRrSNlF1QK8gu7NcctzPM0iq7MLM7s8yffK//+b/v3P5/5vwuV4JNkgqnCDLNEdysVCT0AyMhELY8071ktsuiliaR3LIsT+7fIlFgJgRCz8/PYrNcVrFAIDD9nffKrphNPAqy0ptB2LykEgeQBmB5zeHjj/XBFS17F9s/3Y3q/TWG4Yu9X2H9xo+R5ckbWQkyvf+6x/NysshPA1A7MPAUOblFWlBbd32OYDAIs+zmrd+wKO8t3XZQ1iSD/GsAOnlAzS2+kZkvXoGWP4bgewCETZMAOFNXrxfAZzphxthLksyWijJ7MxQKSQB61WCOfXNSC+ajQ414/yc8AxfBLOvxB/RnwSNTyaczNlUk9LQ64IWfm4f0wXx56KgWzCenbmgC1N2BqaY/c0wjn0HYKwKhl/WDXbzUikkhgCSzOaJM76mDSG6GmsO1/wkkJQWQ3DRTIPShOsCCRW/A23DhfwNJOQFEQotFooRU54vzl+Lq9V+eG0gqCZAmEFo+OqG523X/hYGkhACSVDhFJMoJvdOVq9air+/hmIHYXoB0mc3gyYTe4ebKHTFnc7YWIJ2xqYKsXNef9AcOHkE4HHseZ2sBBN2ez87JxzlvY9yB2FoAkdBbqpO6+oZxBcKrPtVH5Q+/awL8eA92WAHKU9XJkyf9cQcxOBhE4dslIwI09WkCdHTDBitAHsn0Wtsux02+cnuVFgQtKkFZU4Q8h38AthDgM9WJmxZgZ9UeHDn27ZjYtmt31MxHln+nRn5rh7nkjRPAkz9zIS2Y8De8DfvPofRf8hzXemwiALcWX3vVspLScRHny57PvJ589Q3zyRsqAIDy4eFhtHVcxdHa76K+w+058DUqj7dgy4mOKPDTvqKpL2rPc1S0AwMhGwqA55j3bjTBF4HPfKLIJ0yA811jE+cHXiL2fFIEGAoDzX8CpzqjwZOc9m7zr7qkC2BlMyoVrsjOyQtW7zsIu5kxqbBMB9VCaJKuAEVzEqvxQpl/8+cHpJGI92dK0gTwPYj9aowX8fxMSUkB2uwgQBiRQEdfjRNFm122gFXMEYA4KwDOFiBJOAO6+4FNrcbfAB+2Rnxb/gxoiKFCHC8au2wgQHd/ZLYm7QqwijkCEGcFwNkCxCmHkVLVoM8O1aDPKYfhlMNWMOcaJM41CCcPIE4tAKcYIk41iIQmQql1C8hU6/by+wOwi/3V49fI82f9ExBAaVcdna3zwi52+nuDmqZEQtfq+wJ4S5rV7eavt6Pa5kSZrR63ANnZBdN486HqjDclrivf/OzBdCzvBRMJHhOPLXNhrn7/d024cTKDsHm8DXWsJ3GWg6z0Cu7Fc11G2PwsNkuQFW/SScWOemFB3quGkHeNEoL3DPFn9AJRtlgL/Gk/LY6X+D8HkQ1r0Sc9gwAAAABJRU5ErkJggg=="
          }
          alt={fileName}
          onClick={handleDownload}
        />
      </>
    </div>
  );
};

export default FilePreview;
