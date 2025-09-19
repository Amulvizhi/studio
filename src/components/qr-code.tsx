// This is a static SVG representation of a QR code for styling purposes.
// In a real application, you would use a library to generate a dynamic QR code.
interface QRCodeProps {
  value: string;
  size?: number;
}

export default function QRCode({ value, size = 160 }: QRCodeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-md">
        <title>QR Code for booking: {value}</title>
        <path d="M0 0H33V33H0V0Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H7V7H0V0ZM1 1H6V6H1V1Z" fill="black"/>
        <path d="M2 2H5V5H2V2Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M26 0H33V7H26V0ZM27 1H32V6H27V1Z" fill="black"/>
        <path d="M28 2H31V5H28V2Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M0 26H7V33H0V26ZM1 27H6V32H1V27Z" fill="black"/>
        <path d="M2 28H5V31H2V28Z" fill="black"/>
        <path d="M9 1H10V2H9V1Z" fill="black"/>
        <path d="M12 1H13V2H12V1Z" fill="black"/>
        <path d="M15 1H16V2H15V1Z" fill="black"/>
        <path d="M18 1H19V2H18V1Z" fill="black"/>
        <path d="M21 1H22V2H21V1Z" fill="black"/>
        <path d="M24 1H25V2H24V1Z" fill="black"/>
        <path d="M8 2H9V3H8V2Z" fill="black"/>
        <path d="M11 2H12V3H11V2Z" fill="black"/>
        <path d="M14 2H15V3H14V2Z" fill="black"/>
        <path d="M17 2H18V3H17V2Z" fill="black"/>
        <path d="M20 2H21V3H20V2Z" fill="black"/>
        <path d="M23 2H24V3H23V2Z" fill="black"/>
        <path d="M9 4H10V5H9V4Z" fill="black"/>
        <path d="M12 4H13V5H12V4Z" fill="black"/>
        <path d="M15 4H16V5H15V4Z" fill="black"/>
        <path d="M18 4H19V5H18V4Z" fill="black"/>
        <path d="M21 4H22V5H21V4Z" fill="black"/>
        <path d="M24 4H25V5H24V4Z" fill="black"/>
        <path d="M8 5H9V6H8V5Z" fill="black"/>
        <path d="M11 5H12V6H11V5Z" fill="black"/>
        <path d="M14 5H15V6H14V5Z" fill="black"/>
        <path d="M17 5H18V6H17V5Z" fill="black"/>
        <path d="M20 5H21V6H20V5Z" fill="black"/>
        <path d="M23 5H24V6H23V5Z" fill="black"/>
        <path d="M1 9H2V10H1V9Z" fill="black"/>
        <path d="M4 9H5V10H4V9Z" fill="black"/>
        <path d="M1 12H2V13H1V12Z" fill="black"/>
        <path d="M4 12H5V13H4V12Z" fill="black"/>
        <path d="M1 15H2V16H1V15Z" fill="black"/>
        <path d="M4 15H5V16H4V15Z" fill="black"/>
        <path d="M1 18H2V19H1V18Z" fill="black"/>
        <path d="M4 18H5V19H4V18Z" fill="black"/>
        <path d="M1 21H2V22H1V21Z" fill="black"/>
        <path d="M4 21H5V22H4V21Z" fill="black"/>
        <path d="M1 24H2V25H1V24Z" fill="black"/>
        <path d="M4 24H5V25H4V24Z" fill="black"/>
        <path d="M28 9H29V10H28V9Z" fill="black"/>
        <path d="M31 9H32V10H31V9Z" fill="black"/>
        <path d="M28 12H29V13H28V12Z" fill="black"/>
        <path d="M31 12H32V13H31V12Z" fill="black"/>
        <path d="M28 15H29V16H28V15Z" fill="black"/>
        <path d="M31 15H32V16H31V15Z" fill="black"/>
        <path d="M28 18H29V19H28V18Z" fill="black"/>
        <path d="M31 18H32V19H31V18Z" fill="black"/>
        <path d="M28 21H29V22H28V21Z" fill="black"/>
        <path d="M31 21H32V22H31V21Z" fill="black"/>
        <path d="M28 24H29V25H28V24Z" fill="black"/>
        <path d="M31 24H32V25H31V24Z" fill="black"/>
        <path d="M9 27H10V28H9V27Z" fill="black"/>
        <path d="M12 27H13V28H12V27Z" fill="black"/>
        <path d="M15 27H16V28H15V27Z" fill="black"/>
        <path d="M18 27H19V28H18V27Z" fill="black"/>
        <path d="M21 27H22V28H21V27Z" fill="black"/>
        <path d="M24 27H25V28H24V27Z" fill="black"/>
        <path d="M8 28H9V29H8V28Z" fill="black"/>
        <path d="M11 28H12V29H11V28Z" fill="black"/>
        <path d="M14 28H15V29H14V28Z" fill="black"/>
        <path d="M17 28H18V29H17V28Z" fill="black"/>
        <path d="M20 28H21V29H20V28Z" fill="black"/>
        <path d="M23 28H24V29H23V28Z" fill="black"/>
        <path d="M9 30H10V31H9V30Z" fill="black"/>
        <path d="M12 30H13V31H12V30Z" fill="black"/>
        <path d="M15 30H16V31H15V30Z" fill="black"/>
        <path d="M18 30H19V31H18V30Z" fill="black"/>
        <path d="M21 30H22V31H21V30Z" fill="black"/>
        <path d="M24 30H25V31H24V30Z" fill="black"/>
        <path d="M8 31H9V32H8V31Z" fill="black"/>
        <path d="M11 31H12V32H11V31Z" fill="black"/>
        <path d="M14 31H15V32H14V31Z" fill="black"/>
        <path d="M17 31H18V32H17V31Z" fill="black"/>
        <path d="M20 31H21V32H20V31Z" fill="black"/>
        <path d="M23 31H24V32H23V31Z" fill="black"/>
        <path d="M8 8H9V9H8V8ZM10 8V9H9V10H8V11H9V12H8V13H9V14H8V15H9V16H8V17H9V18H8V19H9V20H8V21H9V22H8V23H9V24H8V25H9V26H10V25H11V26H12V25H13V26H14V25H15V26H16V25H17V26H18V25H19V26H20V25H21V26H22V25H23V26H24V25H25V24H26V23H25V22H26V21H25V20H26V19H25V18H26V17H25V16H26V15H25V14H26V13H25V12H26V11H25V10H26V9H25V8H24V9H23V8H22V9H21V8H20V9H19V8H18V9H17V8H16V9H15V8H14V9H13V8H12V9H11V8H10V9H9V8H8Z" fill="black"/>
    </svg>
  );
}
