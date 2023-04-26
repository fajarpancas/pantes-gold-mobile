import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../../themes/Colors';
import Spacer from '../../components/Spacer';
import OrderCard from '../../components/OrderCard';
import {scale} from '../../services/Scale';
import Text from '../../components/Text';
import OfferCard from '../../components/OfferCard';
import NavigationServices from '../../services/NavigationServices';
import HeaderCabang from '../../components/HeaderCabang';

const img =
  'data:image/jpeg;base64,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';

const dummy = [
  {
    image: img,
    date: '10 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 5,
    status: 'Selesai',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
];

const imgOffer =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISEhgSEhUYGBgYGBgYGBgZGhUYGRgYGRgaGRgYGBgcIS4mHB4rIRgZJjgmKy80Njc1GiQ7QDs0Py40NTEBDAwMEA8QHBISHjQkIys1NDY0MTQxMTQ0MTQ0NDE0NDQ0NDE0NDQ0NDQxNDQ0NDY9OjE0NDE0MTY0NDQ0NDQ/NP/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EAD0QAAICAQMCAwYDBgQGAwEAAAECABEDBBIhBTEiQVEGEzJhcYFSkaEUFSNCscEzYtHwcoKS0uHxFiRDNP/EABoBAQEBAQEBAQAAAAAAAAAAAAABAgMEBQb/xAAlEQEBAAICAgICAQUAAAAAAAAAAQIRAzESIQRBIlFhBRMUgaH/2gAMAwEAAhEDEQA/AOq6l11tKWVsasn7NmzBgx3lsTICm3bQB94vis+fArnAy+0pxoHyIPjdHVfeqy7cRyKCuRFIJ45Iqjuudk3T8OVC+RA5CPj5utmTbvUjsQdi/lMBel4kIGPGWYMzC2diWZNjM7uTY2+HxXx2ny94aks3Xrxl3VrTu5RWfaGIBbaSVBPkrHuPn5za0GUBefSZHTOkLiVQxvbwiDdsQeQW+Wr1P2AmrN4fHsu7Wcs5ZqEKiyfWVsvhdW9eD95akOpTcpHP2nq8ZJqMS+/aYQkWmfcoP+v95LKzYIQhKCV9R8S/X+0sSvqPiT6/fsf0ky6anaxCEJWTGjGkjRjSCBpVzdxLbSnqe1+kzW4QxtwuNMwNrQ65cWnyZspbZhUsxUWQoBZjXmAB5czQ0fUcGXIcKllyKi5CjKyscbkhXFimWxVgmjwanOaph+69cL5OnyqPmWxMFA9STwBNnQdOQOusORndsC4Vbw7Ux2GIUAcksASTfwjtOvlMcPK/Tle9NhManzJ5I+47yjpNfhy5cmBSRkw7d6MKYBhuRhfDKfUGr4jMPUAuQL/KTtB9D5E+fymXquntmy58+lYLqsGcNjJPhdDp8AfDkrvjcqRf8rLY5UiY+NzTmw3rV+1yllaGfrGHGjZXXKERXdzsJ2rjJV2avmrcdztJFiGfq+BF3OuVReJeUPJzNsxV623HHbzqZ/UHZ+i6klGR8mDVVjb4w+Q5KSh3a2rjuY72pcNoMIVu+bRkFaJATUYizAUfhAJPHFcz0ajO2pl12FA7ZA6BBjJ3KfF7xiiKtXuYsNu0c2V9RFw6hHZ8YV0dFVmV1rhy4Ugjwt8Ddiarmpm646Z8WbFmyZNTjc4i5ABOMM6Im04lFEMN9gWNpJI4iezz5ly5sDZv2nCmPG2PUELvstkDYXyL4cjKFDWKI389xJZBrQiwmFU9O4GM35ysqAdhBe0dOPFx+M3e3TLL2BFiRZ2ZEDCECthO1yvrz+VD+4lmVtV4af05PzA/pLIkn6av7EIRZUJK2p+NPr9+x+XaWZX1Fb0Pbk8/Y8feZq49rEIQmmTWEYZI0YZBA0r5BLTSBxJW4oo3FenEVozN4XvyPH3ikzlWnReyjCnF82pr5UZ0M863Ecg19IHM/wCJvzM6Y8mprTncN3b0aUeqZnx4iyAluAKV3PzpVU81dWKurnHaPqD42vcSPMEmdTpdUuRdyn6/KdMeSVm46Z+k1eu8KsjEcbmo7qZgWJDKo3KLAqhz2NVJMuo1n8XhgXdVwhVLbUANsxCEKTVkm+9AWADpXCzNeTOmcddrGFDGq3XirMSvYE7SlWLJ7ntVG5e0Ooy5EY5kCEHaK3U3AthuANWSK+XnwY6zAmTyXRtQhCZNMuLEiw0IsSLAIQhAZkWxUZpG4o+R8u3PI7/Lj7SaVQuzJdcN3I9eNtjz8x95m+rtqe5pbhCE0glbMP4iV8/Wqqvz5/WWZWy/4i+fBNccfDTfqR95KsWYkWEqEMYY+NMIicSu4lpxIHElailqce4ESpjexz3HB+s0HWZ+pTad47fzfT1mMo1DjI2MdcQzmqMmWNHrHxNuU/UeRlZpGTLKmncaHXJlW1PPmPMS1OBwalsbblNETp+mdaTIAr8N+hnTHLfbnljprQixJtBCEIGVFhCFEWEIBCEIBINWlrYuxyKu7HI+vIHEniMLFRZuLLqkxOGUEeYHy8uxHkY+VdG1FksGju8gfGSTYHzB587lqSXcWz2JVyH+Ko8trVV97S7+UtSrf8X08IvvzZNV9KP6Rl9GP2tQhElQRCIsIRGRInEmIjWElVVcSvkSXHWQOszWmORsbafhPwn0/wAskJlnUYQwIImcrlDsf/lPr/5nPKNRK0ieSEyN5FRNED12itImMJpu9M6+2OlyeJf1E6fTarHkFowM84LSbTat8ZtGIm8crGbi9JqE4f8A+SZvUflCb82PF0cIRRNAhCEAhCEAhCECjqSVdHqwCQaJumoE151wfkAZfBuVNdjDLRFxnTtSX/h141HIPevJvmDfeZuUx7b1uL5lFD/GY/5VF8cctwPlyDL2RHVSxAAAJJ9ABZ85maHKHcuPMKfsRYv53Y8uwk8plZok9VowixDNsiEIQhCIwiPMQwImEhdZYIlRNUjNsNq34WFH7esxbJdNyVG6ynqcAcUf/XzE0nSV3SNEYZY4ztf/AJW9fkfQxzNNDUYQwIYWDMjNjbH6snr3K/X1HzmLi1Ke0iaKuQEWDGsZlo1pGZIZG0JSboRtRZpNPQYsSLOzkIQhAIQhAIQhAiy9pn6RvdahXqvIkd2B7gnyFWftNJxMrqOK1Imc5vFqdrXX+u4XR8GJ7ctscHcQoDU/B4NVR+vzlbpGAY1AVdo8hzOP9mNG/vHfIG4YqSQeXF7iCe58XP0E77TJQmMN221rKTGSRZEWAhOzAiRYkgSNYx8iyf7+3JJPkIEmiYNlUHsLJ8vkOf8AfaRdf12iKMHrIy8AY7LK1XTN2X1ozl+o9Va3x4222dpcUaSiGCH8R7buws+cZowTjXFjRVQV2Bqhfa+STZJPnd8+Xly5N2zGbrrOPX5W6bHSMz5Mdv6kKSbJXys+vcfaWmWJpkpQPSSlZ3xlkkrFu6pukrOk0GSQOkowtToCCWxmj5r/ACn/AEMpDNztYbW9D/Y+YnRPjlPU6Vcgphf9R8wfKZuLUyZhMaYmbSZMfK+NfT+YffzkCagNx2I7g8EfUGYsXe00IzdCQeiQhCelwLCEIBCEUQsJCLELAdzUikMgyEqysKsMv9Y3NrdqqVUMz3sU87j9VVgD59j9JyXtb7TrjPuMJLuCpdzQCnhto/zg9/IEVzyBNeW8Z2bk93p1P7uXCDtU8uimyptVB2kV/wAZ59PLvLagAWe3r5TyhvazVg72beA+8I1dudq2ALYbid3a68PE7rpntFi1GNc+Enady5UcAthIBoGgbYjdtIIsE+hEeHhOtQmXl97rooSumpU82AKDXY7H5XcsTQIlRY0sB9zX5wFJmF17r2n0+9XcM4DKca891rxMDS8kcXf98T2w9rTjZ9JpyQ48OVx5HuURu47i2+3e64RmJ7/+pucXlPbnlnq+noPR3xdQT9oxoi0xDoGLFDwACDXB2lrocsfrOjwaUKJ4/wBB1x0WrTMnwMdmRa3DY3BIX1F7h+XYme0q6nlWDDyYdiPIj5Gc/wC3MPTpM7lCBIER9RKhETLIXSWiIxkksVRdJA6S+6SBkkXai6ShqtAmT4lv0PYj6EcibDJIWSTSsD9zr+N/+qE3fdwjUHQxYQnRzEIQgEIQlUSrqtQcdMtEqQaN8+tHyP6eXnYtGUdZqvdqx27tylVXsSx4+/ftXejM3ojE6v1bJkVWOJxjUZOce8gGiAaCcAXfY+c8uw4si4kyZAayb9hNktsanPPJ5M9M1/UXGNdLmxshDKGybH44I8C7QDxurkec4rS6hcqnRanIqpgG/FmcBGpfCEZb+FgwI87UfFPT/T8MeTLK2363+2fkbmM1GUH/APXqfQes0vZ8ZMOtzYnRt4R02qCx3q6BXAAN8Fj5d+/YRcH7IuNtQmZHbEwZcfiDM24BWpgDtsg2AfnJ+h6kZNQ+uy7veWoVQl43vwmmvdupFHAPN3PT8nhxnDcrf4/25cNvnJHoOm6m7j3b4wjgICW8gAGqioJv0vkm+Jto9zFTquTLlTNkwOqMrKPCy1QJLWyiwbP5HiqmtpmNcmz8hQ+gE+Xjdzvb0319aTEylr+o+4xZs4Kk4sbvsYXupS3Bvv4fTzlpzxMrU5GyY3xKUJfsjqWRuykOAQSh3KD28vlNS6vtnW3j2mO4lySS1mz3LHlmPzvn6yYmDYvdZmXIox+ItsF7VViSoU2eADxyfqZa6YNHnzDHk1DYwaCkoArE3xvNbf8AmHN95+gvx+LKY5e5PvTwbyls7ZnVARjJHf5ehIH956t7B6w5enYGcsWUOnI4Co7KgBrnwgc33uefZOm/tDvj0ofIt7FApnI/EWFDmiw47ceU9F9ldA2l0WDA3vNwDub27Ldt/hoX/P2vyPrPn/O4sePKavf1+nfgytldBCCmLPA7m1GkR5hCoisidJOYhWTQpukiZJeKSNkk0u1PZElv3cI0u1+EjxZFcBlNg+kfc2wWEIQCEIQEaUNXlOMhwLo0eapTwTd3dHyl8iUtZpt4Ikqxg+03UcJyINO/iG1SR2rlSBt2ngE9iPW+0y/bX2axpiXI+0liu1kC3jG2mHkXW6NigCTNzS9O0uLIX1KkqQQDRO0n+Y16TI07Pqs4x5XdsAZtqgt4QDat4aI7Afe/lMY5ZYZeUur/AA3qWa+o5N+k6QPgCBrfGoIZid7kkF6NbQeDt5AA+s7DqfS/2HCpDKRkYeAKBsQgeA01EAAncbFk8URWt7TdHxJiXJiDArQSmcgV8JsDuLvk+Q+czukaxMiPj1n8VwNibhfgJHZhyrCzz/4m+Xkz5Pxztpj4z3jGsnUceTDjTHtaxTAmtihgVHluPnZ8xdE3etgHExOm9LCUQtTdxrQkm/tmyTorjic71DK2Jy1kKwIJF2LFXx9fr2I5E6MiU9XpFyCjGUJXLdZ6XpdUjPwqqoKHhmbdxw/NqDxXPAB45M5vU+w+QOy7m8CqSNq3yeUA3dhTEccgelTodb0DIhLYXKX3HdT9VPBlcHqYZvHjbeArFgxLKOwNHmd+L5fNxTxxvr9Jlx45e1vpfs9ixsTkG87QybmCAgr8YUGge9EHm1q+Z0eldXYsihU7IoJIAHzP+/rMHRdO1GSvfZLAFbVG1a716kfK6nT6bCEAAnPLPLkyuWV3SY44zUWFjoghciAxDFMbCkhCEgSBEIQG1COhIPPuj9cyYDXxJ5g+X0nc6DqOPOu5Gv1HmJ5Wj+R4Pp/cSzptW+Ng+NiCJR6vcW5zHR/alMlJm8Dfi/lP+k6RXBFg8H05lTR8WNBiwFjSIsg1Grx4yoyOqljS7iBfIHH3I5+Y9YEOq0oyCjX3mbqelqEIUAfQTa1GVMal8jBVFWTwBZofqQIIyuoZSCDyCPOS47alczp9DkZl945YKAAD6C6v1PJ5M1cfTEBBCj8pZ02qw5GZMbozLe4KQa2na35Hg+h4Mfo9dhzD+FkR6Ck7WB4a9p48jRo+dGTRtMiVJJWOuxe7bLvTYu7c+4bV2Eq9t2FEEH6R66rGcnuw6l9m/YCN2y9u+vw3xc0ymjSI6JAjZAfKRqmMkgbbHccWPqPKWJnromGd86lQXQIBRNlTaFueALfhavfz2EC2Ct7bF1dcXXa69I53Va3ECzQsgWfQX3MoHppOcZdwrf7yq8V+4OHZuv4KO6vWHUNA+Rt+N0VtjoGdA5TcQQ6WasEcqQQ1L2rkL4yLe2xY8rF19Ipcc8jjvz24vn04mX+6f/tHUF7G8uEpaB/Z1w7t1bi1BuCdtN2sAyDH0RwmZWyBv2hHD2g2+8bd4wO5FPtok+FEHlA29wurF96869YTM6Z0gYHdw5fcoS2+IIjH3aX+FUpfmdzHljNOAkIQgBiQhUAhCoQPKdVpvPz9ZUDkGm7/AKGbubHczNTgEuiILmr0vr2bTmgdy+atyPt6TEYMnfkevmP9Y4PfIka29L6X7RYM9C9j/hb+xmzPGt02Ome0ufBQ3b0/C39j5SGnpu6UuqaXJl2KjoqBtzoyu2+qKKSrClvkj+agDxYOb032p02Wgx2N6N2+xm6jAi1II9RzCaQ63TtkR0tKO0ruDmtpDeLawJ5HBBFcd47p+BseNcbuXZbtju5skgCyTQB2iyTQFknmTbobpUZvTOn5cQTGcoOPHjbGiBCpYWmxnYsbZVQjgC97H0Eg6b0R8GNkXOWc6fFhTI4JKHGjLajdWy23he9k2xFBdq4sbNMTS9B93iyYEyFkcJtDongKKEI8CqpUoiCtvcMSTu4f07oKYMwyIxICZEpu4R3wnGinyREwhQPPcT3JvYhGzQiXC4kB0Y6Bu/ldfIkFbH2Yj7xbhAz/AN2koqu4tcOTDaptsP7vxUWaq92OL5vykZ6RYFuFZchyqUTYqP7o4xsTcdo53EEncS18NU1IkDP/AHUm0Dw7hg9zv2jdW3buvv8AaB6Z/GGYORTh2WrDAYTiUd+CNxO4eRIIPBGhCAIoUBQKAAAHoBwBCJCAsSEIBC4piQCESEDhcglXLiuXysidZoY+bFM/LpiDa8f0P1E3siX2lTLhmRi764bg/p+cUmXsunB8pQyadl+E8eh/t6RpZRul3Q9Yz4T/AA3YD0ux+RmWX/Fx9e35xWMmmncaD26PAzJf+ZeP0M6PRe0Gly/DkAPo3BnkW6AeoNR7krg8gg/rFueMaXrGfF/h5GHyvj8pu6T251CcZFV/0MJp6VcW5x2l9u8Lf4iMv05E19P7TaPJ2yAfXj+sbTVbMJXx63G/wup+hEnDg+YlQsIlxYBAwiQCEIXAIRrZFHciRNq8a92ECeEytR1/TY/idfzEx9V7b4F+AFvoINOtkb5FXliBPPNZ7a5n4xqF+sw9T1XPl+N2+g4ELp6v+8cX41/MQnju8+p/Mwg07qpZ6VhR9RjVxas6gj1BPbiQGXOh/wD9WL/jX+s0iN9YfdM402mLBQQKIFkJ3Hv7HLsNppv4bGvSwmu0mRVOPTJbIrbmTKEUFgj72LgBlIYlLsB1JI2tF6A2HV5s2POqA5H3ojPqAzJ3dtuVV3ur4sYDgWOaru1tE0SYymFcJJYIG3s43q7hjyRZ3s5IsWT8hDDB6thVtOmUYkxschQhLqvd43one6khnYWD5TnXxXOx1mJm0aMWU3nykkeE8hRbbvExPxEnxAHxeINMbL0rIN/A8Fb6ZDVgkdjz8J7eklajn8umBHMoZdIR8PHy7j8p1Z6PmLKoUW4JXxJ2VQ7XzwQrKaPrKx6TkKowUU7bE8S8tuK1345B5kXblWDr3X7j/QxgyA9j9ux/KdFn6ZkAsqCPBRUq4O/ds2lSd17W7eld5V1HRX957koN5YKBakW1V4r20bBu65hZkx90TdLep6Pkxgt2A2chkdTvDMhUgkEEI3I7VzzG/ufVUpCAh62nco3WjZOOeaCNfoRRokCXS7Vt0N0kOgzBQxQgFS6klPEq4f2hivNmk5PoSB34jsXTc7nGqpZzK7YxaguEUs3BPB2iwDRIZa+IXNLsxM7L2Yj6Ey1i6xqE+HK/5mVMejyNkGEKN5AaiVAo4/e2WJoeA3z9O8lfpWoVHdkAXGSH8aEjaqMSAG8Yp0NrfxRoaKe0+rX/APQn6gSdPbHWD+YH7TLy9F1SO2M47dMZysqsjEIG2kgA+I2ews+dSPUdMz42ZHSmRnVhuQ02PH71xYJBpObHB7d40bbo9tNV/l/WDe2uqP4f1mPp+havIdqYyx3InDY+GfH71bO7hdhB3HgWASDxKWk0z5QWTbSgEs7oi+L4VtiBuNGh34PkDTQ6FvbHVn+ZR9pA/tTqz/PX0AmZj6bmZVcKKfZQ3pvp32IzJe5VZuASK7eotuHp+V0d1UEIWB8aBrRS7BVJt6VSfCDwI0LmTrmpbvlb7GpUfV5G+J2P1JlbMNh2sRdA+FlfgixypPPy7wSz2U/0jRtMDHAx2PSZG9B+suYunDu3P17flDO1JTfA5+ksJp2PlU39D0LNkF48TbfxEbV+zGgftN3Reydke+fb/lQWf+o0B+RmMuTHHurJleo4n9k+Z/SE9F/+LaX8WX/qT/thMf5GB45KFS70Qf8A2sX/ABr/AFlKT6DMuPImRrIVgTXevOvnPQymPspkGS2KZw7l8jZAjFmoorOS5tNgsqAeWQc+O536Nm3b2Ted4Kk5MYyLstWdiNquXSlBBUjaO0uZes4GcuwyE0APBp+KAC1ak8EWLJ5/IN/eum5BRyCSa2afgk3x4PShz5D7y7Z0z9dp8qaVFyim96xqwQLx491AO+0F9xose9+czHzP4+b38taqbIBAPI4PiPIrvNjrHUMeVERN9qT8SqvHkBs4Pc80OKmMVmasNfVZCVYtZQUu4K1CgKAIPHA4+/cmQNqcnh8XKNvUlULBtxa9xF/ESa7cydlkbJKK7ajICG3UQUIoKACl7NoApas1XrInz5C65C5LrVM3iPh7WTe6vnfp2llkkTY4IqZy72GPB2WKUDwAqlACgAGYUOOYwvkARQ5Ax79g4IXf8dcecttjjWSFZ7jIVRd52orog4pUyBhkUf8AEGYff5CRag5nUK2RmChlQGiEVsfumVB/ICnhpaHbzAM0/dCIccG2Jkx5jm/aN7e9/Hxu+DZ39dvF9/PvzIDjz+7fCMjFMhZnQncHZthLNuu2tEN9xt4qzfQ+7HpD3YmTbBfLq/ee9GVlcgAuiojGnD8lVFncoNnk1yakQ/atwb3hsMW+FCNxQYzYK0QUAUg8EdxyZ0XuxD3fymjcYWLNrFYuud1LOHJXaLYFCLAFbRsTw9vAOKjNBps+A3icqfD5KwtDuRtrggMpFhu48iJ0Axj0jvc8cwMTDgzhEQZGCoVK8LY2MXQFq3MqsSQpJAPlLWPBkAcBhTklwuPEvLIUYrtUbLUkHbVgm7szWxaVm+FSfoD/AF8pdw9HyN/L/v5ntOeXJjj3VmNvUc1j6Wo/ll/TdIZ+ET79h+s6nTdCAN5Gv5L/ANx/8S8m7GP8O+3wc+XqbnDL5Usvj/12nDe6x9B7Kjg5XI/yoOf+pv8ASdf0npOmxUceJd34m8bfUFu32mFqx71drJmUcklSu62XaRf08x8+eTLen0+4Ck1Api3Gzk7k4tlPHgHA9Se+2uNzyyvusyfj7mq6rUrx2mLl+ORZNCBiUD9psNe0+73HwIOSEoCk8q5LHvtqhpgcbEBMptgbchjwgHf7fP8ArXPPH9VrjrUhCoTGm3KQMIT7DymwhCEoMbCEgQxpiQlDGkZhCFMaMMWEENiGEIQhhCEyAQaEJpAJZ0v+Iv1iQkvTUdW/YR8IT5XN29ePQEBCE5fToF7zW0kITeDlmuaj4Zj5PjEITWTHGZCEJW3/2Q==';

const dummyOffer = [
  {
    image: imgOffer,
    name: 'Gelang Naga',
  },
  {
    image: imgOffer,
    name: 'Kalung bintang melengkung',
  },
  {
    image: imgOffer,
    name: 'Gelang Cincin Emas',
  },
];

class HomeScreen extends React.PureComponent {
  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <HeaderCabang />
        <Spacer height={30} />
        {dummy?.length && (
          <>
            <View style={[styles.padding20, styles.flexRow]}>
              <Text size={16}>Pesanan</Text>
              <TouchableOpacity onPress={this.navigate} activeOpacity={0.8}>
                <Text size={12} color={Colors.primary}>
                  Lihat semua
                </Text>
              </TouchableOpacity>
            </View>
            <Spacer height={10} />
            <View style={styles.listWrapper}>
              {dummy.map((item, index) => {
                return (
                  <View style={index !== 0 ? styles.paddingLeft10 : {}}>
                    <OrderCard item={item} />
                  </View>
                );
              })}
            </View>
          </>
        )}

        {dummy?.length && (
          <>
            <Spacer height={25} />
            <View style={[styles.padding20, styles.flexRow]}>
              <Text size={16}>Penawaran</Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text size={12} color={Colors.primary}>
                  Lihat semua
                </Text>
              </TouchableOpacity>
            </View>
            <Spacer height={10} />
            <View style={styles.listWrapper}>
              {dummyOffer.map((item, index) => {
                return (
                  <View style={index !== 0 ? styles.paddingLeft10 : {}}>
                    <OfferCard item={item} hideStatus />
                  </View>
                );
              })}
            </View>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listWrapper: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  paddingLeft10: {
    paddingLeft: scale(10),
  },
  padding20: {
    paddingHorizontal: scale(20),
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default HomeScreen;
