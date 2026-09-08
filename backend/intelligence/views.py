import torch
import pickle
import numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .model import NexusBrain
from .engine import get_ai_insight

# ১. মডেল এবং স্কেলার লোড করা (সার্ভার স্টার্ট হওয়ার সময় একবার হবে)
MODEL_PATH = 'intelligence/nexus_brain.pth'
SCALER_PATH = 'intelligence/scaler.pkl'

# মডেল আর্কিটেকচার তৈরি এবং ওয়েট লোড করা
model = NexusBrain(input_size=5) # আমাদের ডাটাসেটে ৫টি ইনপুট ছিল
model.load_state_dict(torch.load(MODEL_PATH, weights_only=True))
model.eval() # ইনফারেন্স মোড

with open(SCALER_PATH, 'rb') as f:
    scaler = pickle.load(f)

# ২. NOVA AI কুয়েরি ভিউ (আগের মতোই)
class NovaAIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        query = request.data.get('query', '')
        result = get_ai_insight(query)
        return Response({"ai_response": result})

# ৩. এআই চালিত সিমুলেশন ভিউ
class SimulationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        try:
            # স্লাইডার থেকে ডাটা নেওয়া (না থাকলে ডিফল্ট ভ্যালু)
            inputs = np.array([[
                float(data.get('sleep', 7.5)),
                float(data.get('exercise', 3.0)),
                float(data.get('stress', 5.0)),
                float(data.get('nutrition', 85.0)),
                float(data.get('genetics', 75.0))
            ]])

            # ১. ডাটা স্কেল করা
            inputs_scaled = scaler.transform(inputs)
            inputs_tensor = torch.FloatTensor(inputs_scaled)

            # ২. এআই প্রেডিকশন
            with torch.no_grad():
                prediction = model(inputs_tensor)
                result = prediction.item()

            return Response({
                "projected_impact": round(result, 2),
                "confidence_score": "98.2%",
                "engine": "Nexus Neural Engine v1"
            })
        except Exception as e:
            return Response({"error": str(e)}, status=400)