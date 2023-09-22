declare module "*module.scss" {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

interface NextFetchRequestConfig {
  revalidate?: number | false; // 초 단위
  tags?: string[];
}

interface RequestInit {
  next?: NextFetchRequestConfig | undefined;
}
