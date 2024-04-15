s.boot;
~toOSC = NetAddr.new("127.0.0.1", 57121);    // create the NetAddr
~toOSC.sendMsg("/hello", "there");    // send the application the message "hello" with the parameter "there"

(
SynthDef.new(\pizzicato, {
    arg freq = 880, amp = 1, mult = 1, pan = 0;
    var f = freq;
    var env = EnvGen.kr(Env.new([0, 1, 0.0125, 0], [0.01, 0.1, 2], [3, -3, -3]), doneAction: 2);
    var env2 = Env.new([0, 1, 0], [0.01, 4], [3, -7]).kr;
    var env3 = Env.new([0, 1, 0], [0.0001, 0.025], [3, -7]).kr;
    var pEnv = Env.new([0.9, 1], [0.15], [3]).kr;
    var lfo = SinOsc.ar(4, [0, pi]).range(0.5, 1);
    var op4 = SinOsc.ar(f * 0.0625) * env3 * 10;
    var op3 = SinOsc.ar(f * 1, lfo * 12);
    var op2 = SinOsc.ar(f * 1, op4 * 12 + (op3 * 4) * (1 - env2)) * env2;
    var op5 = SinOscFB.ar(f * 0.25, 0.125) * 2;
    var op1 = SinOsc.ar(f * [1, 1.001] * 0.5, op2 * mult + op4 + op5) * lfo * 0.1;
    var op6 = SinOsc.ar(f * 0.25) * 0.1;
    var sig = op1 + op6 * env * amp;
    sig = sig * LFTri.ar(f * 0.5).range(0.92, 1);
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    sig = sig + (LPF.ar(sig, 110) * 12) + (LPF.ar(sig, 55) * 24);
    Out.ar(0, sig);
}).add;
)

(
var melody = Pseq([0, 4, 7, 11, 12, 16, 19], inf).asStream;
~pizziPattern.stop;
~pizziPattern = Pbind(
    \instrument, \pizzicato,
    \dur, 0.5,
    \amp, 1,
    \mult, 2.85,
    \freq, FuncStream({
    var f = 440 * -2.midiratio * melody.next.midiratio;
        ~toOSC.sendMsg("/frequency", f);
        f;
    })
).play();
)