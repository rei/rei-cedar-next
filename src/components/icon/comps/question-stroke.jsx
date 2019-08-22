
import { CdrIcon } from 'componentsdir/icon/CdrIcon';

export default {
  name: 'IconQuestionStroke',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M12 22C6.4771525 22 2 17.5228475 2 12S6.4771525 2 12 2s10 4.4771525 10 10-4.4771525 10-10 10zm0-2c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-.6903559 0-1.25-.5596441-1.25-1.25s.5596441-1.25 1.25-1.25 1.25.5596441 1.25 1.25S12.6903559 18 12 18zm1.5-8.5c0-.82842712-.6715729-1.5-1.5-1.5s-1.5.67157288-1.5 1.5c0 .5522847-.4477153 1-1 1-.55228475 0-1-.4477153-1-1C8.5 7.56700338 10.0670034 6 12 6s3.5 1.56704621 3.5 3.5c0 1.796114-1.5720772 2.5857687-1.8045751 2.7338138-.2189909.1394445-.3993676.3341397-.5214988.5644547C13.0628924 13.0076555 13 13.2464831 13 13.5c0 .5592471-.4477153 1.0069623-1 1.0069623s-1-.4477152-1-1c0-.9606148.3814065-1.6256937 1-2.2569623.6185935-.6312686 1.5-.9343567 1.5-1.75z"></path>
    </cdr-icon>)
  },
};
