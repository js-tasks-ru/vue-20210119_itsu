<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': this.isLoading }"
      :style="this.backgroundImageStyle"
      @click="this.resetFileIfPresent"
    >
      <span>{{ this.label }}</span>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        @change="this.uploadFile"
        :disabled="this.isLoading"
        ref="input"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',
  model: {
    prop: 'imageId',
    event: 'change',
  },
  data() {
    return {
      isLoading: false,
    };
  },
  props: {
    imageId: {
      type: String,
      default: null,
    },
  },
  computed: {
    backgroundImageStyle: function () {
      return this.imageId
        ? `--bg-image: url('${ImageService.getImageURL(this.imageId)}')`
        : '';
    },
    label: function () {
      if (this.imageId) {
        return 'Удалить изображение';
      }
      if (!this.imageId && this.isLoading) {
        return 'Загрузка...';
      }
      return 'Загрузить изображение';
    },
  },
  methods: {
    uploadFile: async function (e) {
      const file = e.target.files[0];
      this.isLoading = true;
      const result = await ImageService.uploadImage(file);
      this.isLoading = false;
      this.$emit('change', result.id);
    },
    resetFileIfPresent: function (e) {
      if (this.imageId && !this.isLoading) {
        e.preventDefault();
        this.$refs.input.value = null;
        this.$emit('change', null);
      }
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
