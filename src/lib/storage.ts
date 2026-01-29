/**
 * 로컬 스토리지 기반 데이터 저장
 * Cloudflare Pages에서는 서버리스이므로 클라이언트 측 저장소 사용
 */

export interface UserInfo {
  gender: 'male' | 'female' | 'other';
  age: number;
  dominantHand: 'right' | 'left';
}

export interface HandImages {
  dominant: string;  // 주사용 손 (필수)
  nonDominant?: string;  // 비주사용 손 (선택)
}

export interface Reading {
  id: string;
  timestamp: number;
  imagePreview: string; // 작은 미리보기 이미지
  handType: string;
  handShape: any;
  analysis: any;
  interpretation: any;
  overallScore: number;
  // 새로 추가된 필드
  userInfo?: UserInfo;
  handImages?: HandImages;
}

const STORAGE_KEY = 'palmseer_readings';
const MAX_READINGS = 20;

// 읽기 목록 가져오기
export function getReadings(): Reading[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to get readings:', error);
    return [];
  }
}

// 단일 읽기 가져오기
export function getReadingById(id: string): Reading | null {
  const readings = getReadings();
  return readings.find(r => r.id === id) || null;
}

// 읽기 저장
export function saveReading(reading: Reading): void {
  if (typeof window === 'undefined') return;

  try {
    let readings = getReadings();

    // 중복 체크
    readings = readings.filter(r => r.id !== reading.id);

    // 새 읽기 추가
    readings.unshift(reading);

    // 최대 개수 유지
    if (readings.length > MAX_READINGS) {
      readings = readings.slice(0, MAX_READINGS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
  } catch (error) {
    console.error('Failed to save reading:', error);
  }
}

// 읽기 삭제
export function deleteReading(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    let readings = getReadings();
    readings = readings.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
  } catch (error) {
    console.error('Failed to delete reading:', error);
  }
}

// 모든 읽기 삭제
export function clearAllReadings(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear readings:', error);
  }
}

// 고유 ID 생성
export function generateId(): string {
  return `reading_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// 이미지 축소 (미리보기용)
export async function createThumbnail(imageBase64: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxSize = 100;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL('image/jpeg', 0.5));
    };
    img.onerror = () => resolve('');
    img.src = imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`;
  });
}
