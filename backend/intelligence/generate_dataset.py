import pandas as pd
import numpy as np
import os

def create_nexus_dataset():
    np.random.seed(42)
    num_samples = 1000

    data = {
        'sleep_hours': np.random.uniform(4, 10, num_samples),
        'exercise_freq': np.random.randint(0, 7, num_samples),
        'stress_level': np.random.uniform(0, 10, num_samples),
        'nutrition_score': np.random.uniform(50, 100, num_samples),
        'genetic_resilience': np.random.uniform(60, 95, num_samples),
        'bio_age_offset': [] 
    }

    for i in range(num_samples):
        offset = (data['sleep_hours'][i] * 0.4) + \
                 (data['exercise_freq'][i] * 0.3) - \
                 (data['stress_level'][i] * 0.5) + \
                 (data['nutrition_score'][i] * 0.1)
        data['bio_age_offset'].append(round(offset, 2))

    df = pd.DataFrame(data)
    
    # Dataset সেভ করার পথ
    data_dir = os.path.join('intelligence', 'data')
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
        
    file_path = os.path.join(data_dir, 'biology_dataset.csv')
    df.to_csv(file_path, index=False)
    print(f"Dataset generated successfully at: {file_path}")

if __name__ == "__main__":
    create_nexus_dataset()